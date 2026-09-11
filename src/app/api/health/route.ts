import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL ? 'PRESENT (length: ' + process.env.DATABASE_URL.length + ')' : 'MISSING';
    const jwtSecret = process.env.JWT_SECRET ? 'PRESENT' : 'MISSING';
    
    // Test prisma query
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      userCount,
      env: {
        DATABASE_URL: dbUrl,
        JWT_SECRET: jwtSecret,
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error?.message || 'Unknown error',
      name: error?.name,
      code: error?.code,
      stack: error?.stack,
      env: {
        DATABASE_URL: process.env.DATABASE_URL ? 'PRESENT' : 'MISSING',
        JWT_SECRET: process.env.JWT_SECRET ? 'PRESENT' : 'MISSING',
      }
    }, { status: 500 });
  }
}
