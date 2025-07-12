/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatCurrency(amount: number, currency = 'NGN') {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: string | Date, pattern = 'PP') {
  return format(new Date(date), pattern)
}

export function formatRelativeDate(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function calculateFlightDuration(distance: number, cruiseSpeed: number) {
  // Add 30 minutes for takeoff and landing
  const flightTime = distance / cruiseSpeed + 0.5
  const hours = Math.floor(flightTime)
  const minutes = Math.round((flightTime - hours) * 60)
  return { hours, minutes, total: flightTime }
}

export function calculateTotalPrice(
  pricePerHour: number,
  departureDate: Date,
  returnDate?: Date
) {
  if (!returnDate) {
    // Minimum 2 hours for one-way flights
    return pricePerHour * 2
  }

  const hours = Math.abs(returnDate.getTime() - departureDate.getTime()) / 36e5
  // Minimum 2 hours
  return pricePerHour * Math.max(2, hours)
}

export function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    LIGHT_JET: 'Light Jet',
    MIDSIZE_JET: 'Midsize Jet',
    SUPER_MIDSIZE_JET: 'Super Midsize Jet',
    HEAVY_JET: 'Heavy Jet',
    ULTRA_LONG_RANGE_JET: 'Ultra Long Range Jet',
  }
  return labels[category] || category
}

export function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    COMPLETED: 'bg-blue-100 text-blue-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
