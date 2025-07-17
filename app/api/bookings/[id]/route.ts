import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import  prisma  from '@/lib/db'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const booking = await prisma.booking.findUnique({
            where: {
                id: params.id,
                // Only show booking if user owns it or is admin
                ...(session.user.role !== 'ADMIN' && { userId: session.user.id }),
            },
            include: {
                user: true,
                jet: true,
                payment: true,
            },
        })

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
        }

        return NextResponse.json(booking)
    } catch (error) {
        console.error('Error fetching booking:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const booking = await prisma.booking.findUnique({
            where: { id: params.id },
        })

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
        }

        // Check permissions
        if (session.user.role !== 'ADMIN' && booking.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // Check if booking can be cancelled (only pending or confirmed)
        if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
            return NextResponse.json(
                { error: 'Booking cannot be cancelled' },
                { status: 400 }
            )
        }

        // Update booking status to cancelled
        const updatedBooking = await prisma.booking.update({
            where: { id: params.id },
            data: { status: 'CANCELLED' },
        })

        // Update availability to make dates available again
        const dateRange = []
        const currentDate = new Date(booking.departureDate)
        const endDate = booking.returnDate || booking.departureDate

        while (currentDate <= endDate) {
            dateRange.push(new Date(currentDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }

        await prisma.availability.updateMany({
            where: {
                jetId: booking.jetId,
                date: {
                    in: dateRange,
                },
            },
            data: {
                available: true,
            },
        })

        return NextResponse.json({
            message: 'Booking cancelled successfully',
            booking: updatedBooking,
        })
    } catch (error) {
        console.error('Error cancelling booking:', error)
        return NextResponse.json(
            { error: 'Failed to cancel booking' },
            { status: 500 }
        )
    }
}