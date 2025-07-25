import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Await the params Promise to get the actual parameters
        const { id } = await params;

        const jet = await prisma.jet.findUnique({
            where: {
                id,
                isActive: true,
            },
            include: {
                availability: {
                    where: {
                        date: {
                            gte: new Date(),
                            lte: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // Next 90 days
                        },
                    },
                },
            },
        });

        if (!jet) {
            return NextResponse.json(
                { error: 'Jet not found' },
                { status: 404 }
            );
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