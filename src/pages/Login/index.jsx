import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Phone, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneLogin, setPhoneLogin] = useState({
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    // Demo login - redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="gradient-card border-border">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-2xl font-bold text-foreground">
                Welcome Back
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in with your phone number to access your account
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handlePhoneLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43213"
                      value={phoneLogin.phone}
                      onChange={(e) =>
                        setPhoneLogin({ ...phoneLogin, phone: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={phoneLogin.password}
                      onChange={(e) =>
                        setPhoneLogin({
                          ...phoneLogin,
                          password: e.target.value,
                        })
                      }
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary text-primary-foreground"
                >
                  Sign In
                </Button>
              </form>

              <div className="text-center space-y-4">
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Demo credentials: +91 98765 43213 (any password)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
