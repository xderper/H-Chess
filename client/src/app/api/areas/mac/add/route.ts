import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
    try {
        const { areaId, mac } = await request.json();

        if (!areaId || !mac) {
            return NextResponse.json(
                { error: 'Area ID and MAC address are required' },
                { status: 400 }
            );
        }

        // Validate MAC address format
        const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        if (!macRegex.test(mac)) {
            return NextResponse.json(
                { error: 'Invalid MAC address format' },
                { status: 400 }
            );
        }

        const { db } = await dbConnect();

        if (!db) {
            return NextResponse.json(
                { error: 'Database connection failed' },
                { status: 500 }
            );
        }

        // Add the MAC address to the area
        const result = await db.collection('areas').findOneAndUpdate(
            { _id: new ObjectId(areaId) },
            { $push: { pc: mac } },
            { returnDocument: 'after' }
        );

        if (!result) {
            return NextResponse.json(
                { error: 'Area not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { 
                message: 'PC added successfully',
                area: result
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error adding PC:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
