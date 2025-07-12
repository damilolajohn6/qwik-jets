# Swift jet - Private Jet Rental Application

A modern fullstack web application for luxury private jet rentals built with Next.js 15 (App Router), TypeScript, Prisma, MongoDB, and Tailwind CSS.

## 🚀 Features

### Public Features
- **Browse Jets**: Filter by location, price, range, category, and capacity
- **Jet Details**: Photo gallery, specifications, amenities, and availability calendar
- **Smart Booking**: Dynamic pricing, date selection, and secure checkout
- **User Dashboard**: Booking history, profile management, and saved payment methods
- **Authentication**: Email/password and OAuth providers via NextAuth.js

### Admin Panel
- **Jet Management**: Full CRUD operations for jet listings
- **Customer Management**: View, suspend, and export customer data
- **Booking Management**: Monitor and manage all bookings with status updates
- **Analytics Dashboard**: Revenue tracking, booking metrics, and fleet overview
- **Role-based Access**: Secure admin-only routes

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Prisma ORM
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **File Upload**: Cloudinary
- **Email**: Nodemailer
- **Payment**: Stripe (optional)

## 📋 Prerequisites

- Node.js 18.17 or later
- MongoDB instance (local or MongoDB Atlas)
- Cloudinary account
- Email service credentials (for Nodemailer)
- Stripe account (optional)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/damilolajohn6/qwik-jets.git
   cd qwik-jets
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your credentials:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/luxjet?retryWrites=true&w=majority"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"

   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=""
   CLOUDINARY_API_KEY=""
   CLOUDINARY_API_SECRET=""

   # Email
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="noreply@luxjet.com"

   # Stripe (optional)
   STRIPE_PUBLISHABLE_KEY=""
   STRIPE_SECRET_KEY=""
   STRIPE_WEBHOOK_SECRET=""
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
luxjet/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   ├── (public)/            # Public pages
│   ├── admin/               # Admin panel (protected)
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # UI components
│   ├── forms/               # Form components
│   └── layouts/             # Layout components
├── lib/                     # Utility functions
│   ├── auth.ts             # Auth configuration
│   ├── db.ts               # Database client
│   └── validations/        # Zod schemas
├── prisma/                  # Database schema
│   ├── schema.prisma       # Prisma schema
│   └── seed.ts             # Seed script
├── public/                  # Static assets
├── styles/                  # Global styles
└── types/                   # TypeScript types
```


### User Roles
- **USER**: Can browse jets, make bookings, and manage their profile
- **ADMIN**: Full access to admin panel and all features

## 📚 API Documentation

### Public Endpoints
- `GET /api/jets` - List all jets with filters
- `GET /api/jets/[id]` - Get jet details
- `GET /api/jets/[id]/availability` - Check jet availability
- `POST /api/bookings` - Create a booking (authenticated)
- `GET /api/bookings` - Get user bookings (authenticated)

### Admin Endpoints
- `POST /api/admin/jets` - Create jet
- `PUT /api/admin/jets/[id]` - Update jet
- `DELETE /api/admin/jets/[id]` - Delete jet
- `GET /api/admin/customers` - List all customers
- `GET /api/admin/bookings` - List all bookings
- `PUT /api/admin/bookings/[id]` - Update booking status

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run type checking
npm run type-check
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Docker

```bash
# Build the image
docker build -t luxjet .

# Run the container
docker run -p 3000:3000 --env-file .env.local luxjet
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- All contributors and testers

---

Built with ❤️ by Esan Damilola for qwik technologies