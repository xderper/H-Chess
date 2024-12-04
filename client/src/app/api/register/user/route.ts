import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        
        const { login, password, email } = await request.json();

        // Валидация данных
        if (!login || !password) {
            return NextResponse.json(
                { error: 'Login and password are required' },
                { status: 400 }
            );
        }

        if (login.length < 3) {
            return NextResponse.json(
                { error: 'Login must be at least 3 characters long' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters long' },
                { status: 400 }
            );
        }

        // Проверка существующего пользователя
        const existingUser = await User.findOne({ 
            $or: [
                { login },
                ...(email ? [{ email }] : [])  // Проверяем email только если он предоставлен
            ]
        });
        
        if (existingUser) {
            const field = existingUser.login === login ? 'login' : 'email';
            return NextResponse.json(
                { error: `User with this ${field} already exists` },
                { status: 400 }
            );
        }

        // Создание нового пользователя
        const userData = {
            login,
            password,
            role: 'user',
            ...(email && { email })  // Добавляем email только если он предоставлен
        };

        const user = await User.create(userData);

        return NextResponse.json({ 
            success: true,
            user: {
                id: user._id,
                login: user.login,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Failed to register user' },
            { status: 500 }
        );
    }
}