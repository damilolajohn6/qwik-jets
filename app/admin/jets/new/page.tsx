import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JetForm } from "@/components/admin/jet-form";

export default function NewJetPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add New Jet</h1>
        <p className="text-gray-600">Add a new aircraft to your fleet</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Jet Details</CardTitle>
          <CardDescription>
            Fill in the information below to add a new jet to your fleet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JetForm />
        </CardContent>
      </Card>
    </div>
  );
}
