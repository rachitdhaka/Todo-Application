import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = { name: fullName, email, password };
      const response = await axios.post(
        "https://todo-application-nze4.onrender.com/user/signup",
        data
      );
      console.log("Signup successful:", response.data);

      // Navigate to login page after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen w-full flex  justify-center items-center  bg-[#f8fafc] relative">
      {/* Bottom Fade Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
        }}
      />
      {/* Your Content/Components */}
      <Card className="w-full max-w-sm z-1 relative shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your email below to Create your account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={login}>
              Login
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="fullName">Full Name</Label>
                </div>
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Spinner className="mr-2" />}
            {isLoading ? "Creating account..." : "SignUp"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
