import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import Area from '@/models/Area';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        
        const { areaId, mac } = await request.json();
        
        if (!areaId || !mac) {
            return NextResponse.json(
                { error: 'Area ID and MAC address are required' },
                { status: 400 }
            );
        }

        const area = await Area.findById(areaId);
        if (!area) {
            return NextResponse.json(
                { error: 'Area not found' },
                { status: 404 }
            );
        }

        // Remove the MAC address from the pc array
        const index = area.pc.indexOf(mac);
        if (index === -1) {
            return NextResponse.json(
                { error: 'MAC address not found in this area' },
                { status: 404 }
            );
        }

        area.pc.splice(index, 1);
        await area.save();

        return NextResponse.json(
            { message: 'MAC address deleted successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Delete MAC error:', error);
        return NextResponse.json(
            { error: 'Failed to delete MAC address' },
            { status: 500 }
        );
    }
}