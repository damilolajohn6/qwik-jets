import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/Message";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        // Await the params Promise to get the actual parameters
        const { id } = await params;

        const deleted = await Message.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Message not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Message deleted" });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
