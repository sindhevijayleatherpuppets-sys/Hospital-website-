import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const DEFAULT_SUPABASE_URL = 'postgresql://postgres.oqiunvbiyzhlskdhdwpy:Sindhevijay%402005@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true'

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL || DEFAULT_SUPABASE_URL
  const isRemote = connectionString.includes('supabase') || connectionString.includes('pooler') || connectionString.includes('sslmode=require') || connectionString.includes('.com')
  
  const pool = new Pool({ 
    connectionString,
    ssl: isRemote ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 10
  })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
