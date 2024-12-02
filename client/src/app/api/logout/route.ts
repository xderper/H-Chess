import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const response = NextResponse.json({ success: true })
    
    // Удаляем токен из куки
    response.cookies.delete('token')
    
    return response
}
