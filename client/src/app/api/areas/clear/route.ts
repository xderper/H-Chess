import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import Area from '@/models/Area';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        await Area.deleteMany({});

        return NextResponse.json(
            { message: 'All areas cleared successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Clear areas error:', error);
        return NextResponse.json(
            { error: 'Failed to clear areas' },
            { status: 500 }
        );
    }
}
