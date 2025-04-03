
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import MfaVerificationForm from "@/components/auth/MfaVerificationForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [requiresMfa, setRequiresMfa] = useState<boolean>(false);
  const [pendingCredentials, setPendingCredentials] = useState<{email: string, password: string} | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/admin");
    return null;
  }

  const handleMfaRequired = (email: string, password: string) => {
    setRequiresMfa(true);
    setPendingCredentials({ email, password });
  };

  const handleAuthSuccess = () => {
    toast({
      title: "Authentication successful",
      description: "You have been successfully logged in.",
    });
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {requiresMfa ? "Two-Factor Authentication" : (activeTab === "login" ? "Welcome Back" : "Create an Account")}
            </CardTitle>
            <CardDescription className="text-center">
              {requiresMfa 
                ? "Please enter the code from your authenticator app"
                : (activeTab === "login" 
                  ? "Enter your credentials to access your account" 
                  : "Fill out the form below to create your account")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {requiresMfa ? (
              <MfaVerificationForm 
                email={pendingCredentials?.email || ""} 
                password={pendingCredentials?.password || ""} 
                onSuccess={handleAuthSuccess}
                onCancel={() => setRequiresMfa(false)}
              />
            ) : (
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm onMfaRequired={handleMfaRequired} onSuccess={handleAuthSuccess} />
                </TabsContent>
                <TabsContent value="register">
                  <RegisterForm onSuccess={() => setActiveTab("login")} />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            {!requiresMfa && (
              activeTab === "login" ? (
                <p>Don't have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => setActiveTab("register")}>Register</span></p>
              ) : (
                <p>Already have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => setActiveTab("login")}>Login</span></p>
              )
            )}
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
