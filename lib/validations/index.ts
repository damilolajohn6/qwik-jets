import { z } from 'zod'
import { Category, BookingStatus, PaymentStatus } from '@prisma/client'

// User schemas
export const userRegisterSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(10, 'Name must be at least 10 characters'),
    phone: z.string().optional(),
})

export const userUpdateSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    phone: z.string().optional(),
})

// Jet schemas
export const jetCreateSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    tailNumber: z.string().min(5, 'Tail number must be at least 5 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category: z.nativeEnum(Category),
    capacity: z.number().int().min(1).max(200),
    amenities: z.array(z.string()),
    maxRange: z.number().int().min(100).max(100000),
    cruiseSpeed: z.number().int().min(100).max(6000),
    pricePerHour: z.number().min(500).max(20000000000),
    images: z.array(z.string().url()),
    baseLocation: z.string().min(2),
})

export const jetUpdateSchema = jetCreateSchema.partial()

export const jetFilterSchema = z.object({
    category: z.nativeEnum(Category).optional(),
    minCapacity: z.number().int().optional(),
    maxPrice: z.number().optional(),
    location: z.string().optional(),
    minRange: z.number().int().optional(),
})

// Booking schemas
export const bookingCreateSchema = z.object({
    jetId: z.string().min(1, "Jet ID is required"),
    departureDate: z.string().datetime({ message: "Invalid departure date" }),
    returnDate: z.string().datetime({ message: "Invalid return date" }).optional(),
    departureCity: z.string().min(2, "Departure city must be at least 2 characters"),
    arrivalCity: z.string().min(2, "Arrival city must be at least 2 characters"),
    passengers: z.number().int().min(1).max(200),
    specialRequests: z.string().optional(),
    totalPrice: z.number().min(0, "Total price must be non-negative"),
});

export const bookingUpdateSchema = z.object({
    status: z.nativeEnum(BookingStatus),
    pilotAssigned: z.string().optional(),
})

export const bookingFilterSchema = z.object({
    status: z.nativeEnum(BookingStatus).optional(),
    userId: z.string().optional(),
    jetId: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
})

// Availability schemas
export const availabilityCheckSchema = z.object({
    jetId: z.string(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
})

export const availabilityUpdateSchema = z.object({
    dates: z.array(z.object({
        date: z.string().datetime(),
        available: z.boolean(),
    })),
})

// Payment schemas
export const paymentIntentSchema = z.object({
    bookingId: z.string(),
    amount: z.number().positive(),
})

export const paymentUpdateSchema = z.object({
    status: z.nativeEnum(PaymentStatus),
    stripePaymentId: z.string().optional(),
})

// Search schemas
export const searchSchema = z.object({
    query: z.string().optional(),
    category: z.nativeEnum(Category).optional(),
    minCapacity: z.number().int().optional(),
    maxPrice: z.number().optional(),
    departureDate: z.string().datetime().optional(),
    returnDate: z.string().datetime().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
})

// Admin schemas
export const customerFilterSchema = z.object({
    search: z.string().optional(),
    suspended: z.boolean().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
})

export const adminDashboardDateRangeSchema = z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
})