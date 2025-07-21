import { connectDB } from "@/lib/mongodb";
import MessageModel from "@/lib/models/Message";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

interface Message {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location?: string;
  comment?: string;
  newsletter: boolean;
  createdAt: string;
}

export default async function AdminMessagesPage() {
  await connectDB();
  const messages: Message[] = await MessageModel.find().sort({ createdAt: -1 });

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📩 Contact Messages
      </h1>

      {messages.length === 0 ? (
        <div className="text-center text-gray-500">No messages found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white shadow rounded-xl p-5 border border-gray-200 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {msg.firstName} {msg.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {format(new Date(msg.createdAt), "PPP p")}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-medium">Email:</span> {msg.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {msg.phone}
                </p>
                {msg.location && (
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {msg.location}
                  </p>
                )}
                {msg.comment && (
                  <p>
                    <span className="font-medium">Comment:</span> {msg.comment}
                  </p>
                )}
                <p>
                  <span className="font-medium">Newsletter:</span>{" "}
                  {msg.newsletter ? "✅ Subscribed" : "❌ Not Subscribed"}
                </p>
              </div>

              {/* Optional delete button */}
              {/* <form action={`/admin/messages/delete/${msg._id}`} method="POST">
                <button
                  type="submit"
                  className="text-red-600 hover:text-red-800 text-sm font-medium mt-3"
                >
                  Delete
                </button>
              </form> */}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
