/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import  prisma  from '@/lib/db'
import type { Prisma } from '@prisma/client'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        // Build filters
        const where: Prisma.JetWhereInput = {
            isActive: true,
        }

        // Category filter
        const category = searchParams.get('category')
        if (category) {
            where.category = category as any
        }

        // Capacity filter
        const minCapacity = searchParams.get('minCapacity')
        if (minCapacity) {
            where.capacity = {
                gte: parseInt(minCapacity),
            }
        }

        // Price filter
        const maxPrice = searchParams.get('maxPrice')
        if (maxPrice) {
            where.pricePerHour = {
                lte: parseFloat(maxPrice),
            }
        }

        // Location filter
        const location = searchParams.get('location')
        if (location) {
            where.baseLocation = {
                contains: location,
                mode: 'insensitive',
            }
        }

        // Range filter
        const minRange = searchParams.get('minRange')
        if (minRange) {
            where.maxRange = {
                gte: parseInt(minRange),
            }
        }

        // Pagination
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const skip = (page - 1) * limit

        // Sort
        const sortBy = searchParams.get('sortBy') || 'pricePerHour'
        const sortOrder = searchParams.get('sortOrder') || 'asc'

        const [jets, totalCount] = await Promise.all([
            prisma.jet.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
                include: {
                    _count: {
                        select: { bookings: true },
                    },
                },
            }),
            prisma.jet.count({ where }),
        ])

        return NextResponse.json({
            jets,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
            },
        })
    } catch (error) {
        console.error('Error fetching jets:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}