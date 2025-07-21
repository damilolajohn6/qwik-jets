import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { jetUpdateSchema } from '@/lib/validations';

export async function GET(
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

        const jet = await prisma.jet.findUnique({
            where: { id },
            include: {
                bookings: {
                    include: {
                        user: true,
                    },
                },
                availability: true,
            },
        });

        if (!jet) {
            return NextResponse.json({ error: 'Jet not found' }, { status: 404 });
        }

        return NextResponse.json(jet);
    } catch (error) {
        console.error('Error fetching jet:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
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
        const validatedData = jetUpdateSchema.parse(body);

        const jet = await prisma.jet.update({
            where: { id },
            data: validatedData,
        });

        return NextResponse.json(jet);
    } catch (error) {
        console.error('Error updating jet:', error);
        return NextResponse.json(
            { error: 'Failed to update jet' },
            { status: 400 }
        );
    }
}

export async function DELETE(
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

        // Check if jet has any bookings
        const bookingsCount = await prisma.booking.count({
            where: { jetId: id },
        });

        if (bookingsCount > 0) {
            return NextResponse.json(
                { error: 'Cannot delete jet with existing bookings' },
                { status: 400 }
            );
        }

        // Delete related availability records first
        await prisma.availability.deleteMany({
            where: { jetId: id },
        });

        // Delete the jet
        await prisma.jet.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Jet deleted successfully' });
    } catch (error) {
        console.error('Error deleting jet:', error);
        return NextResponse.json(
            { error: 'Failed to delete jet' },
            { status: 500 }
        );
    }
}