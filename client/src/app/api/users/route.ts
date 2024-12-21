import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
    try {
        // Проверяем токен
        const token = request.cookies.get('token')?.value
        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Проверяем права доступа
        const userData = await verifyToken(token)
        if (userData.role !== 'admin') {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            )
        }

        await dbConnect()

        // Получаем список пользователей
        const users = await User.find({}, 'login role createdAt')

        return NextResponse.json({
            users: users.map(user => ({
                id: user._id,
                login: user.login,
                role: user.role,
                createdAt: user.createdAt
            }))
        })

    } catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        )
    }
}