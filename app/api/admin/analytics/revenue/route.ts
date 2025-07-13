import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import  prisma  from '@/lib/db'
import { subDays, format } from 'date-fns'

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get revenue data for the last 30 days
        const thirtyDaysAgo = subDays(new Date(), 30)

        const bookings = await prisma.booking.groupBy({
            by: ['createdAt'],
            where: {
                createdAt: {
                    gte: thirtyDaysAgo,
                },
                status: 'CONFIRMED',
            },
            _sum: {
                totalPrice: true,
            },
        })

        // Create a map of dates to revenue
        const revenueMap = new Map()
        bookings.forEach((booking) => {
            const date = format(booking.createdAt, 'MMM dd')
            const currentRevenue = revenueMap.get(date) || 0
            revenueMap.set(date, currentRevenue + (booking._sum.totalPrice || 0))
        })

        // Fill in missing dates with 0 revenue
        const data = []
        for (let i = 0; i < 30; i++) {
            const date = subDays(new Date(), i)
            const dateStr = format(date, 'MMM dd')
            data.unshift({
                date: dateStr,
                revenue: revenueMap.get(dateStr) || 0,
            })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching revenue data:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}