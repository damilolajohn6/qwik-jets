// import { PrismaClient, Category, Role } from '@prisma/client'
// import bcrypt from 'bcryptjs'

// const prisma = new PrismaClient()

// const nigeriaAirports = [
//     { name: 'Murtala Muhammed International Airport', city: 'Lagos', iata: 'LOS' },
//     { name: 'Nnamdi Azikiwe International Airport', city: 'Abuja', iata: 'ABV' },
//     { name: 'Port Harcourt International Airport', city: 'Port Harcourt', iata: 'PHC' },
//     { name: 'Mallam Aminu Kano International Airport', city: 'Kano', iata: 'KAN' },
//     { name: 'Akanu Ibiam International Airport', city: 'Enugu', iata: 'ENU' },
//     { name: 'Victor Attah International Airport', city: 'Uyo', iata: 'QUO' },
//     { name: 'Asaba International Airport', city: 'Asaba', iata: 'ABB' },
//     { name: 'Ilorin International Airport', city: 'Ilorin', iata: 'ILR' },
//     { name: 'Sadiq Abubakar III International Airport', city: 'Sokoto', iata: 'SKO' },
//     { name: 'Kaduna International Airport', city: 'Kaduna', iata: 'KAD' },
//     { name: 'Margaret Ekpo International Airport', city: 'Calabar', iata: 'CBQ' },
//     { name: 'Sam Mbakwe International Airport', city: 'Owerri', iata: 'QOW' },
//     { name: 'Yakubu Gowon Airport', city: 'Jos', iata: 'JOS' },
//     { name: 'Maiduguri International Airport', city: 'Maiduguri', iata: 'MIU' },
//     { name: 'Benin Airport', city: 'Benin City', iata: 'BNI' },
// ]

// const jets = [
//     {
//         name: 'Cessna Citation CJ3+',
//         tailNumber: 'N123CJ',
//         description: 'The Citation CJ3+ is perfect for short to medium-range flights, offering comfort and efficiency for up to 9 passengers.',
//         category: Category.LIGHT_JET,
//         capacity: 9,
//         amenities: ['Wi-Fi', 'Refreshment Center', 'Lavatory', 'Baggage Compartment'],
//         maxRange: 2040,
//         cruiseSpeed: 416,
//         pricePerHour: 2500,
//         images: [
//             'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800',
//             'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800'
//         ],
//         baseLocation: nigeriaAirports[0].city + ', Nigeria', // Lagos
//     },
//     {
//         name: 'Gulfstream G280',
//         tailNumber: 'N456GS',
//         description: 'The G280 delivers superior performance with transcontinental range and best-in-class fuel efficiency.',
//         category: Category.SUPER_MIDSIZE_JET,
//         capacity: 10,
//         amenities: ['Wi-Fi', 'Entertainment System', 'Full Galley', 'Lavatory', 'Sleeping Configuration'],
//         maxRange: 3600,
//         cruiseSpeed: 482,
//         pricePerHour: 4500,
//         images: [
//             'https://images.unsplash.com/photo-1555992643-d54cf4854e24?w=800',
//             'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800'
//         ],
//         baseLocation: nigeriaAirports[1].city + ', Nigeria', // Abuja
//     },
//     {
//         name: 'Bombardier Global 6000',
//         tailNumber: 'N789GL',
//         description: 'Experience ultimate luxury with the Global 6000, featuring three distinct living spaces and intercontinental range.',
//         category: Category.ULTRA_LONG_RANGE_JET,
//         capacity: 13,
//         amenities: ['High-Speed Wi-Fi', 'Entertainment System', 'Full Kitchen', 'Private Stateroom', 'Conference Suite', 'Multiple Lavatories'],
//         maxRange: 6000,
//         cruiseSpeed: 513,
//         pricePerHour: 8500,
//         images: [
//             'https://images.unsplash.com/photo-1533587951018-404d96894b55?w=800',
//             'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800'
//         ],
//         baseLocation: nigeriaAirports[2].city + ', Nigeria', // Port Harcourt
//     },
//     {
//         name: 'Embraer Phenom 300E',
//         tailNumber: 'N321PH',
//         description: 'The Phenom 300E is the most delivered light jet for the past decade, offering exceptional performance and comfort.',
//         category: Category.LIGHT_JET,
//         capacity: 8,
//         amenities: ['Wi-Fi', 'Entertainment System', 'Refreshment Center', 'Lavatory'],
//         maxRange: 2010,
//         cruiseSpeed: 453,
//         pricePerHour: 3000,
//         images: [
//             'https://images.unsplash.com/photo-1610642372651-fe6e7bc209e7?w=800',
//             'https://images.unsplash.com/photo-1593442607435-e8a99cddef12?w=800'
//         ],
//         baseLocation: nigeriaAirports[3].city + ', Nigeria', // Kano
//     },
//     {
//         name: 'Dassault Falcon 2000LXS',
//         tailNumber: 'N654FX',
//         description: 'The Falcon 2000LXS combines transcontinental range with the ability to access challenging airports.',
//         category: Category.HEAVY_JET,
//         capacity: 10,
//         amenities: ['Wi-Fi', 'Entertainment System', 'Full Galley', 'Sleeping Configuration', 'Spacious Baggage'],
//         maxRange: 4000,
//         cruiseSpeed: 476,
//         pricePerHour: 6000,
//         images: [
//             'https://images.unsplash.com/photo-1569629743904-e0088445e5d3?w=800',
//             'https://images.unsplash.com/photo-1570710891163-2ee0f2f92456?w=800'
//         ],
//         baseLocation: nigeriaAirports[4].city + ', Nigeria', // Enugu
//     },
//     {
//         name: 'Hawker 800XP',
//         tailNumber: 'N987HW',
//         description: 'The Hawker 800XP offers a spacious cabin and excellent performance for mid-range flights.',
//         category: Category.MIDSIZE_JET,
//         capacity: 8,
//         amenities: ['Wi-Fi', 'Refreshment Center', 'Lavatory', 'Workstation'],
//         maxRange: 2540,
//         cruiseSpeed: 447,
//         pricePerHour: 4000,
//         images: [
//             'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800',
//             'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800'
//         ],
//         baseLocation: nigeriaAirports[5].city + ', Nigeria', // Uyo
//     },
//     {
//         name: 'Cessna Citation Latitude',
//         tailNumber: 'N234CL',
//         description: 'The Citation Latitude offers a flat-floor cabin and exceptional comfort for mid-range journeys.',
//         category: Category.MIDSIZE_JET,
//         capacity: 9,
//         amenities: ['Wi-Fi', 'Entertainment System', 'Refreshment Center', 'Lavatory'],
//         maxRange: 2850,
//         cruiseSpeed: 440,
//         pricePerHour: 4200,
//         images: [
//             'https://images.unsplash.com/photo-1555992643-d54cf4854e24?w=800',
//             'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800'
//         ],
//         baseLocation: nigeriaAirports[6].city + ', Nigeria', // Asaba
//     },
//     {
//         name: 'Gulfstream G650ER',
//         tailNumber: 'N650ER',
//         description: 'The G650ER is a top-tier ultra-long-range jet with unmatched speed and luxury.',
//         category: Category.ULTRA_LONG_RANGE_JET,
//         capacity: 14,
//         amenities: ['High-Speed Wi-Fi', 'Full Kitchen', 'Private Stateroom', 'Conference Suite', 'Multiple Lavatories'],
//         maxRange: 7500,
//         cruiseSpeed: 516,
//         pricePerHour: 9500,
//         images: [
//             'https://images.unsplash.com/photo-1533587951018-404d96894b55?w=800',
//             'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800'
//         ],
//         baseLocation: nigeriaAirports[7].city + ', Nigeria', // Ilorin
//     },
//     {
//         name: 'Bombardier Challenger 350',
//         tailNumber: 'N350CH',
//         description: 'The Challenger 350 offers a perfect blend of range, speed, and cabin comfort.',
//         category: Category.SUPER_MIDSIZE_JET,
//         capacity: 10,
//         amenities: ['Wi-Fi', 'Entertainment System', 'Full Galley', 'Lavatory', 'Spacious Baggage'],
//         maxRange: 3200,
//         cruiseSpeed: 470,
//         pricePerHour: 4800,
//         images: [
//             'https://images.unsplash.com/photo-1610642372651-fe6e7bc209e7?w=800',
//             'https://images.unsplash.com/photo-1593442607435-e8a99cddef12?w=800'
//         ],
//         baseLocation: nigeriaAirports[8].city + ', Nigeria', // Sokoto
//     },
//     {
//         name: 'Learjet 75',
//         tailNumber: 'N751LJ',
//         description: 'The Learjet 75 combines speed and efficiency for short to medium-range flights.',
//         category: Category.LIGHT_JET,
//         capacity: 8,
//         amenities: ['Wi-Fi', 'Refreshment Center', 'Lavatory'],
//         maxRange: 2040,
//         cruiseSpeed: 465,
//         pricePerHour: 2800,
//         images: [
//             'https://images.unsplash.com/photo-1569629743904-e0088445e5d3?w=800',
//             'https://images.unsplash.com/photo-1570710891163-2ee0f2f92456?w=800'
//         ],
//         baseLocation: nigeriaAirports[9].city + ', Nigeria', // Kaduna
//     },
// ]

// const users = [
//     {
//         email: 'damilolajohn622@gmail.com',
//         password: 'AdminQwikTechnologies#@',
//         name: 'Damilola',
//         role: Role.ADMIN,
//         phone: '+2348034567890'
//     },
//     {
//         email: 'qwiktechnologiesdv@gmail.com',
//         password: 'AdminQwikTechnologies#@1',
//         name: 'Qwik Tech',
//         role: Role.USER,
//         phone: '+2348034567891'
//     },
//     {
//         email: 'qwiktech9@gmail.com',
//         password: 'QwikTechnologies#@',
//         name: 'Mr Qwik',
//         role: Role.USER,
//         phone: '+2348034567892'
//     },
//     {
//         email: 'customer1@qwiktech.com',
//         password: 'CustomerPass123#@',
//         name: 'Aisha Bello',
//         role: Role.USER,
//         phone: '+2348034567893'
//     },
//     {
//         email: 'customer2@qwiktech.com',
//         password: 'CustomerPass456#@',
//         name: 'Chinedu Okeke',
//         role: Role.USER,
//         phone: '+2348034567894'
//     },
// ]

// async function main() {
//     console.log('🌱 Starting seed...')

//     // Clear existing data
//     await prisma.payment.deleteMany()
//     await prisma.booking.deleteMany()
//     await prisma.availability.deleteMany()
//     await prisma.jet.deleteMany()
//     await prisma.account.deleteMany()
//     await prisma.session.deleteMany()
//     await prisma.verificationToken.deleteMany()
//     await prisma.user.deleteMany()

//     // Create users
//     console.log('Creating users...')
//     const createdUsers = []
//     for (const userData of users) {
//         const hashedPassword = await bcrypt.hash(userData.password, 10)
//         const user = await prisma.user.create({
//             data: {
//                 ...userData,
//                 password: hashedPassword
//             }
//         })
//         createdUsers.push(user)
//         console.log(`Created ${userData.role} user: ${userData.email}`)
//     }

//     // Create jets
//     console.log('Creating jets...')
//     const createdJets = []
//     for (const jetData of jets) {
//         const jet = await prisma.jet.create({
//             data: jetData
//         })
//         createdJets.push(jet)
//         console.log(`Created jet: ${jetData.name} based in ${jetData.baseLocation}`)

//         // Create availability for the next 90 days
//         const availabilityData = []
//         const today = new Date()
//         today.setHours(0, 0, 0, 0)

//         for (let i = 0; i < 90; i++) {
//             const date = new Date(today)
//             date.setDate(date.getDate() + i)

//             // Make some random dates unavailable (10% chance)
//             const available = Math.random() > 0.1

//             availabilityData.push({
//                 jetId: jet.id,
//                 date,
//                 available
//             })
//         }

//         await prisma.availability.createMany({
//             data: availabilityData
//         })
//     }

//     // Create sample bookings
//     console.log('Creating sample bookings...')
//     const bookings = [
//         {
//             userId: createdUsers[1].id, // Qwik Tech
//             jetId: createdJets[0].id, // Cessna Citation CJ3+
//             departureDate: new Date('2025-07-15'),
//             returnDate: new Date('2025-07-17'),
//             departureCity: nigeriaAirports[0].city, // Lagos
//             arrivalCity: nigeriaAirports[1].city, // Abuja
//             passengers: 4,
//             totalPrice: 15000,
//             status: 'CONFIRMED' as const,
//             specialRequests: 'Vegetarian meals preferred'
//         },
//         {
//             userId: createdUsers[2].id, // Mr Qwik
//             jetId: createdJets[1].id, // Gulfstream G280
//             departureDate: new Date('2025-07-20'),
//             departureCity: nigeriaAirports[2].city, // Port Harcourt
//             arrivalCity: nigeriaAirports[3].city, // Kano
//             passengers: 6,
//             totalPrice: 9000,
//             status: 'PENDING' as const
//         },
//         {
//             userId: createdUsers[3].id, // Aisha Bello
//             jetId: createdJets[2].id, // Bombardier Global 6000
//             departureDate: new Date('2025-07-25'),
//             returnDate: new Date('2025-07-28'),
//             departureCity: nigeriaAirports[4].city, // Enugu
//             arrivalCity: nigeriaAirports[5].city, // Uyo
//             passengers: 8,
//             totalPrice: 20000,
//             status: 'CONFIRMED' as const,
//             specialRequests: 'Extra legroom for tall passengers'
//         },
//         {
//             userId: createdUsers[4].id, // Chinedu Okeke
//             jetId: createdJets[3].id, // Embraer Phenom 300E
//             departureDate: new Date('2025-07-30'),
//             departureCity: nigeriaAirports[6].city, // Asaba
//             arrivalCity: nigeriaAirports[7].city, // Ilorin
//             passengers: 5,
//             totalPrice: 7500,
//             status: 'PENDING' as const
//         },
//         {
//             userId: createdUsers[1].id, // Qwik Tech
//             jetId: createdJets[4].id, // Dassault Falcon 2000LXS
//             departureDate: new Date('2025-08-01'),
//             returnDate: new Date('2025-08-03'),
//             departureCity: nigeriaAirports[8].city, // Sokoto
//             arrivalCity: nigeriaAirports[9].city, // Kaduna
//             passengers: 7,
//             totalPrice: 18000,
//             status: 'CONFIRMED' as const,
//             specialRequests: 'Business meeting setup'
//         },
//         {
//             userId: createdUsers[2].id, // Mr Qwik
//             jetId: createdJets[5].id, // Hawker 800XP
//             departureDate: new Date('2025-08-05'),
//             departureCity: nigeriaAirports[10].city, // Calabar
//             arrivalCity: nigeriaAirports[11].city, // Owerri
//             passengers: 6,
//             totalPrice: 8000,
//             status: 'PENDING' as const
//         },
//         {
//             userId: createdUsers[3].id, // Aisha Bello
//             jetId: createdJets[6].id, // Cessna Citation Latitude
//             departureDate: new Date('2025-08-10'),
//             returnDate: new Date('2025-08-12'),
//             departureCity: nigeriaAirports[12].city, // Jos
//             arrivalCity: nigeriaAirports[0].city, // Lagos
//             passengers: 9,
//             totalPrice: 16000,
//             status: 'CONFIRMED' as const,
//             specialRequests: 'Child-friendly amenities'
//         },
//         {
//             userId: createdUsers[4].id, // Chinedu Okeke
//             jetId: createdJets[7].id, // Gulfstream G650ER
//             departureDate: new Date('2025-08-15'),
//             departureCity: nigeriaAirports[13].city, // Maiduguri
//             arrivalCity: nigeriaAirports[1].city, // Abuja
//             passengers: 10,
//             totalPrice: 22000,
//             status: 'PENDING' as const
//         },
//     ]

//     for (const bookingData of bookings) {
//         const booking = await prisma.booking.create({
//             data: bookingData
//         })

//         // Create payment for confirmed booking
//         if (bookingData.status === 'CONFIRMED') {
//             await prisma.payment.create({
//                 data: {
//                     bookingId: booking.id,
//                     userId: booking.userId,
//                     amount: booking.totalPrice,
//                     status: 'COMPLETED',
//                     paymentMethod: 'card',
//                     stripePaymentId: 'pi_test_' + Math.random().toString(36).substr(2, 9)
//                 }
//             })
//         }

//         console.log(`Created booking for ${bookingData.departureCity} to ${bookingData.arrivalCity}`)
//     }

//     console.log('✅ Seed completed successfully!')
// }

// main()
//     .catch((e) => {
//         console.error('❌ Seed failed:', e)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })