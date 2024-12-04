import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import Area from '@/models/Area';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        
        const { id } = await request.json();
        
        if (!id) {
            return NextResponse.json(
                { error: 'Area ID is required' },
                { status: 400 }
            );
        }

        const deletedArea = await Area.findByIdAndDelete(id);

        if (!deletedArea) {
            return NextResponse.json(
                { error: 'Area not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Area deleted successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Delete area error:', error);
        return NextResponse.json(
            { error: 'Failed to delete area' },
            { status: 500 }
        );
    }
}
