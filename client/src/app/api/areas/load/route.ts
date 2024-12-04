import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import Area from '@/models/Area';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const areas = await Area.find({}).sort({ createdAt: -1 });

        return NextResponse.json(
            { areas },
            { status: 200 }
        );

    } catch (error) {
        console.error('Get areas error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch areas' },
            { status: 500 }
        );
    }
}
