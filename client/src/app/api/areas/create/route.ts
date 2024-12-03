import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import Area from '@/models/Area';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { name, description } = await request.json();

        const existingArea = await Area.findOne({ name });

        if (existingArea) {
            return NextResponse.json(
                { error: `Area with name ${name} already exists` },
                { status: 400 }
            );
        }

        const areaData = {
            name,
            description
        };

        const area = await Area.create(areaData);

        return NextResponse.json(
            { message: 'Area created successfully', area },
            { status: 201 }
        );

    } catch (error) {
        console.error('Area creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create area' },
            { status: 500 }
        );
    }
}