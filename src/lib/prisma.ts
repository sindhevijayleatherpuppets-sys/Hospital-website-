import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const DEFAULT_SUPABASE_URL = 'postgresql://postgres.oqiunvbiyzhlskdhdwpy:Sindhevijay%402005@aws-0-ap-south-1.pooler.supabase.com:5432/postgres'

function getCleanConnectionString(): string {
  let url = process.env.DATABASE_URL || DEFAULT_SUPABASE_URL
  // Automatically heal legacy direct IPv6 Supabase host to IPv4 Pooler host
  if (url.includes('db.oqiunvbiyzhlskdhdwpy.supabase.co')) {
    url = url
      .replace('db.oqiunvbiyzhlskdhdwpy.supabase.co:5432', 'aws-0-ap-south-1.pooler.supabase.com:5432')
      .replace('db.oqiunvbiyzhlskdhdwpy.supabase.co', 'aws-0-ap-south-1.pooler.supabase.com:5432')
    if (url.includes('://postgres:') && !url.includes('postgres.oqiunvbiyzhlskdhdwpy:')) {
      url = url.replace('://postgres:', '://postgres.oqiunvbiyzhlskdhdwpy:')
    }
  }
  return url
}

const prismaClientSingleton = () => {
  const connectionString = getCleanConnectionString()
  const isRemote = connectionString.includes('supabase') || connectionString.includes('pooler') || connectionString.includes('sslmode=require') || connectionString.includes('.com')
  
  const pool = new Pool({ 
    connectionString,
    ssl: isRemote ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 10
  })

  // Catch unexpected idle client errors to prevent crashing the serverless container
  pool.on('error', (err) => {
    console.error('Prisma Pg Pool background error:', err?.message || err)
  })

  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare const globalThis: {
  prismaGlobal?: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// Retain singleton across serverless Lambda invocations
globalThis.prismaGlobal = prisma

export default prisma
