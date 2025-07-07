import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Card, CardHeader, CardBody, Input, Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/auth-context";

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();
  
  const from = location.state?.from?.pathname || "/admin/dashboard";
  
  React.useEffect(() => {
    if (isAuthenticated) {
      history.replace(from);
    }
  }, [isAuthenticated, history, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!password) {
      setError("Password is required");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(password);
      
      if (success) {
        history.replace(from);
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 items-center">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="lucide:lock" className="text-primary text-xl" />
            <h1 className="font-playfair text-2xl font-bold">Admin Login</h1>
          </div>
          <p className="text-default-500 text-center">
            Enter your password to access the admin dashboard
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="bordered"
              isInvalid={!!error}
              errorMessage={error}
              endContent={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <Icon icon="lucide:eye-off" className="text-default-400" />
                  ) : (
                    <Icon icon="lucide:eye" className="text-default-400" />
                  )}
                </button>
              }
            />
            
            <div className="pt-2">
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
                startContent={!isLoading && <Icon icon="lucide:log-in" />}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
            
            <div className="text-center text-default-500 text-sm">
              <p>For demo purposes, use password: <code>admin123</code></p>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};