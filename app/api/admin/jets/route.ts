import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import  prisma from '@/lib/db'
import { jetCreateSchema } from '@/lib/validations'

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = jetCreateSchema.parse(body)

        // Check if tail number already exists
        const existingJet = await prisma.jet.findUnique({
            where: { tailNumber: validatedData.tailNumber },
        })

        if (existingJet) {
            return NextResponse.json(
                { error: 'A jet with this tail number already exists' },
                { status: 400 }
            )
        }

        // Create the jet
        const jet = await prisma.jet.create({
            data: {
                ...validatedData,
                images: validatedData.images || [],
            },
        })

        // Create availability records for the next 90 days
        const availabilityData = []
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        for (let i = 0; i < 90; i++) {
            const date = new Date(today)
            date.setDate(date.getDate() + i)

            availabilityData.push({
                jetId: jet.id,
                date,
                available: true,
            })
        }

        await prisma.availability.createMany({
            data: availabilityData,
        })

        return NextResponse.json(jet)
    } catch (error) {
        console.error('Error creating jet:', error)
        return NextResponse.json(
            { error: 'Failed to create jet' },
            { status: 400 }
        )
    }
}