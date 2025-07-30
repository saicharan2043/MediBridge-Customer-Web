import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ProfileSection() {
  const sampleUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43213",
    location: "Bangalore, Karnataka",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">
        Profile Settings
      </h2>

      <Card className="gradient-card border-border">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue={sampleUser.name}
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={sampleUser.email}
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue={sampleUser.phone}
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                defaultValue={sampleUser.location}
                className="bg-background border-border"
              />
            </div>
          </div>
          <Button className="gradient-primary text-primary-foreground">
            Update Profile
          </Button>
        </CardContent>
      </Card>

      <Card className="gradient-card border-border">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Reservation reminders</span>
              <Button variant="outline" size="sm">
                On
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground">Medicine expiry alerts</span>
              <Button variant="outline" size="sm">
                On
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground">
                New pharmacy notifications
              </span>
              <Button variant="outline" size="sm">
                Off
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileSection;
