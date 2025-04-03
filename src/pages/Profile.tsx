
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { isAuthenticated, logout } = useAuth();
  const { logoutAll } = useApi();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogoutAllDevices = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAll();
      toast({
        title: "Logged out from all devices",
        description: "You have been successfully logged out from all devices.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out from all devices. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="saved-properties">
              <TabsList className="mb-4">
                <TabsTrigger value="saved-properties">Saved Properties</TabsTrigger>
                <TabsTrigger value="inquiries">My Inquiries</TabsTrigger>
              </TabsList>
              
              <TabsContent value="saved-properties">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Properties</CardTitle>
                    <CardDescription>
                      Properties you have saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      You haven't saved any properties yet.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="inquiries">
                <Card>
                  <CardHeader>
                    <CardTitle>My Inquiries</CardTitle>
                    <CardDescription>
                      Property inquiries you have submitted
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      You haven't made any inquiries yet.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Enable Two-Factor Authentication
                </Button>
                
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Session Management</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-destructive hover:bg-destructive/10"
                      onClick={handleLogoutAllDevices}
                      disabled={isLoggingOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {isLoggingOut ? "Logging out..." : "Logout from all devices"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
