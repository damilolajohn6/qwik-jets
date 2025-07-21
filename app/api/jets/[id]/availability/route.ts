/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { availabilityCheckSchema, availabilityUpdateSchema } from '@/lib/validations';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // Await the params Promise to get the actual parameters
        const { id } = await params;

        const where: any = {
            jetId: id,
        };

        if (startDate && endDate) {
            where.date = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        } else {
            // Default to next 90 days
            where.date = {
                gte: new Date(),
                lte: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            };
        }

        const availability = await prisma.availability.findMany({
            where,
            orderBy: {
                date: 'asc',
            },
        });

        return NextResponse.json(availability);
    } catch (error) {
        console.error('Error fetching availability:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Await the params Promise to get the actual parameters
        const { id } = await params;

        const body = await request.json();
        const validatedData = availabilityCheckSchema.parse(body);

        // Check if dates are available
        const dateRange = [];
        const currentDate = new Date(validatedData.startDate);
        const endDate = new Date(validatedData.endDate);

        while (currentDate <= endDate) {
            dateRange.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const unavailableDates = await prisma.availability.findMany({
            where: {
                jetId: id,
                date: {
                    in: dateRange,
                },
                available: false,
            },
        });

        const isAvailable = unavailableDates.length === 0;

        return NextResponse.json({
            available: isAvailable,
            unavailableDates: unavailableDates.map((a) => a.date),
        });
    } catch (error) {
        console.error('Error checking availability:', error);
        return NextResponse.json(
            { error: 'Failed to check availability' },
            { status: 400 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Await the params Promise to get the actual parameters
        const { id } = await params;

        const body = await request.json();
        const validatedData = availabilityUpdateSchema.parse(body);

        // Update availability for specified dates
        const updates = await Promise.all(
            validatedData.dates.map(async ({ date, available }) => {
                const existingAvailability = await prisma.availability.findFirst({
                    where: {
                        jetId: id,
                        date: new Date(date),
                    },
                });

                if (existingAvailability) {
                    return prisma.availability.update({
                        where: { id: existingAvailability.id },
                        data: { available },
                    });
                } else {
                    return prisma.availability.create({
                        data: {
                            jetId: id,
                            date: new Date(date),
                            available,
                        },
                    });
                }
            })
        );

        return NextResponse.json({
            message: 'Availability updated successfully',
            updated: updates.length,
        });
    } catch (error) {
        console.error('Error updating availability:', error);
        return NextResponse.json(
            { error: 'Failed to update availability' },
            { status: 400 }
        );
    }
}

