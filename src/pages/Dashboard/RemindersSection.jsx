import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Edit, RefreshCw, Trash2 } from "lucide-react";

const sampleReminders = [
  {
    id: 1,
    medicine: "Crocin 500mg",
    frequency: "Twice daily",
    nextDue: new Date(Date.now() + 4 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    id: 2,
    medicine: "Vitamin D3",
    frequency: "Once weekly",
    nextDue: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
];

function RemindersSection() {
  const formatDateTime = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Refill Reminders
        </h2>
        <Button className="gradient-primary text-primary-foreground">
          <Bell className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      {sampleReminders.map((reminder) => (
        <Card key={reminder.id} className="gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {reminder.medicine}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {reminder.frequency}
                </p>
                <p className="text-sm text-muted-foreground">
                  Next due: {formatDateTime(reminder.nextDue)}
                </p>
              </div>
              <div className="flex w-full md:w-auto pt-4 md:pt-0 items-center justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refill Now
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default RemindersSection;
