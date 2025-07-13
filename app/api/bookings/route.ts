/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import  prisma  from '@/lib/db'
import { bookingCreateSchema } from '@/lib/validations'
import { calculateTotalPrice } from '@/lib/utils'

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const bookings = await prisma.booking.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                jet: true,
                payment: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(bookings)
    } catch (error) {
        console.error('Error fetching bookings:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = bookingCreateSchema.parse(body)

        // Check if jet exists and is active
        const jet = await prisma.jet.findUnique({
            where: { id: validatedData.jetId },
        })

        if (!jet || !jet.isActive) {
            return NextResponse.json(
                { error: 'Jet not available' },
                { status: 400 }
            )
        }

        // Check passenger capacity
        if (validatedData.passengers > jet.capacity) {
            return NextResponse.json(
                { error: 'Passenger count exceeds jet capacity' },
                { status: 400 }
            )
        }

        // Calculate total price
        const departureDate = new Date(validatedData.departureDate)
        const returnDate = validatedData.returnDate ? new Date(validatedData.returnDate) : undefined
        const totalPrice = calculateTotalPrice(jet.pricePerHour, departureDate, returnDate)

        // Check availability
        const dateRange = []
        const currentDate = new Date(departureDate)
        const endDate = returnDate || departureDate

        while (currentDate <= endDate) {
            dateRange.push(new Date(currentDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }

        const unavailableDates = await prisma.availability.findMany({
            where: {
                jetId: jet.id,
                date: {
                    in: dateRange,
                },
                available: false,
            },
        })

        if (unavailableDates.length > 0) {
            return NextResponse.json(
                { error: 'Jet is not available for selected dates' },
                { status: 400 }
            )
        }

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                userId: session.user.id,
                jetId: jet.id,
                departureDate,
                returnDate,
                departureCity: validatedData.departureCity,
                arrivalCity: validatedData.arrivalCity,
                passengers: validatedData.passengers,
                totalPrice,
                specialRequests: validatedData.specialRequests,
                status: 'PENDING',
            },
            include: {
                jet: true,
                user: true,
            },
        })

        // Update availability
        await prisma.availability.updateMany({
            where: {
                jetId: jet.id,
                date: {
                    in: dateRange,
                },
            },
            data: {
                available: false,
            },
        })

        // Send confirmation email (implement email service)
        // await sendBookingConfirmationEmail(booking)

        return NextResponse.json(booking)
    } catch (error) {
        console.error('Error creating booking:', error)
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 400 }
        )
    }
}