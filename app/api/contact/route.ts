import { connectDB } from '@/lib/mongodb';
import Message from '@/lib/models/Message';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const message = await Message.create(body);

        return NextResponse.json({ success: true, message });
    } catch (error) {
        console.error('Contact POST Error:', error);
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
    }
}
