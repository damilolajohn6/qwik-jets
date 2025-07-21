import mongoose, { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location?: string;
    comment?: string;
    newsletter: boolean;
    createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        location: String,
        comment: String,
        newsletter: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.models.Message || model<IMessage>('Message', MessageSchema);
