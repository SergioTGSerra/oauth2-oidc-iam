import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

// Define the type for the global object
type GlobalWithPrisma = typeof global & {
  prisma?: ReturnType<typeof createPrismaClient>
}

// Helper function to create the extended Prisma client
const createPrismaClient = () => {
  return new PrismaClient().$extends(withAccelerate())
}

// Cast the global object to the custom type
const globalForPrisma = global as GlobalWithPrisma

// Initialize prisma with the extended client
const prisma = globalForPrisma.prisma || createPrismaClient()

// Assign prisma to the global object in non-production environments
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma