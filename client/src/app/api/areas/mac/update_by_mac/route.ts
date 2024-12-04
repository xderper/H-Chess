import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request) {
    try {
        const { oldMac, newMac } = await request.json();

        if (!oldMac || !newMac) {
            return NextResponse.json(
                { error: 'Both old and new MAC addresses are required' },
                { status: 400 }
            );
        }

        // Validate MAC address format
        const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        if (!macRegex.test(newMac)) {
            return NextResponse.json(
                { error: 'Invalid MAC address format' },
                { status: 400 }
            );
        }

        const { db } = await dbConnect();

        // Check if db is undefined
        if (!db) {
            return NextResponse.json(
                { error: 'Database connection failed' },
                { status: 500 }
            );
        }

        // Find the area containing the old MAC address
        const result = await db.collection('areas').findOneAndUpdate(
            { pc: oldMac },
            { $set: { "pc.$": newMac } },
            { returnDocument: 'after' }
        );

        if (!result) {
            return NextResponse.json(
                { error: 'MAC address not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { 
                message: 'MAC address updated successfully',
                area: result
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating MAC address:', error);
        return NextResponse.json(
            { error: 'Failed to update MAC address' },
            { status: 500 }
        );
    }
}