import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Cog,
  Globe,
  Mail,
  Shield,
  Bell,
  UserCog,
  Database,
  Save,
} from "lucide-react";

// Schema for general settings form
const generalFormSchema = z.object({
  siteName: z.string().min(2, { message: "Site name is required" }),
  siteDescription: z.string().min(10, { message: "Site description must be at least 10 characters" }),
  contactEmail: z.string().email({ message: "Invalid email address" }),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  enableMaintenance: z.boolean().default(false),
});

// Schema for notification settings form
const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  newPropertyNotification: z.boolean().default(true),
  newUserNotification: z.boolean().default(true),
  newInquiryNotification: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

// Schema for security settings form
const securityFormSchema = z.object({
  requireMfa: z.boolean().default(false),
  passwordPolicy: z.enum(["low", "medium", "high"]).default("medium"),
  sessionTimeout: z.enum(["30min", "1hour", "4hours", "1day", "1week"]).default("4hours"),
  maxLoginAttempts: z.enum(["3", "5", "10", "unlimited"]).default("5"),
});

// Schema for integration settings form
const integrationFormSchema = z.object({
  googleApiKey: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  facebookPixelId: z.string().optional(),
  mailchimpApiKey: z.string().optional(),
  stripePublicKey: z.string().optional(),
  enableSocialLogin: z.boolean().default(false),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;
type NotificationFormValues = z.infer<typeof notificationFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;
type IntegrationFormValues = z.infer<typeof integrationFormSchema>;

const AdminSettings = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  // Initialize form with default values
  const generalForm = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      siteName: "EcoVilla Property",
      siteDescription: "Find your dream eco-friendly property in Spain.",
      contactEmail: "info@ecovillaproperty.com",
      enableMaintenance: false,
    },
  });

  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      newPropertyNotification: true,
      newUserNotification: true,
      newInquiryNotification: true,
      marketingEmails: false,
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      requireMfa: false,
      passwordPolicy: "medium",
      sessionTimeout: "4hours",
      maxLoginAttempts: "5",
    },
  });

  const integrationForm = useForm<IntegrationFormValues>({
    resolver: zodResolver(integrationFormSchema),
    defaultValues: {
      enableSocialLogin: false,
    },
  });

  // Form submission handlers
  const onGeneralSubmit = (data: GeneralFormValues) => {
    console.log("General settings updated:", data);
    toast({
      title: "Settings updated",
      description: "General settings have been saved successfully.",
    });
  };

  const onNotificationSubmit = (data: NotificationFormValues) => {
    console.log("Notification settings updated:", data);
    toast({
      title: "Settings updated",
      description: "Notification settings have been saved successfully.",
    });
  };

  const onSecuritySubmit = (data: SecurityFormValues) => {
    console.log("Security settings updated:", data);
    toast({
      title: "Settings updated",
      description: "Security settings have been saved successfully.",
    });
  };

  const onIntegrationSubmit = (data: IntegrationFormValues) => {
    console.log("Integration settings updated:", data);
    toast({
      title: "Settings updated",
      description: "Integration settings have been saved successfully.",
    });
  };

  // Redirect if not authenticated (will always be authenticated in dev mode)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />
        <main className="flex-grow p-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
            
            <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Cog className="h-4 w-4" />
                  <span className="hidden md:inline">General</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden md:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden md:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden md:inline">Integrations</span>
                </TabsTrigger>
              </TabsList>
              
              {/* General Settings */}
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure basic site settings and information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...generalForm}>
                      <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                        <FormField
                          control={generalForm.control}
                          name="siteName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Site Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                The name of your website displayed in the browser tab.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="siteDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Site Description</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={3} />
                              </FormControl>
                              <FormDescription>
                                A short description of your site for SEO purposes.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="contactEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" />
                              </FormControl>
                              <FormDescription>
                                Primary contact email for the website.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="logoUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Logo URL</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                URL to your site logo (optional).
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="faviconUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Favicon URL</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                URL to your site favicon (optional).
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={generalForm.control}
                          name="enableMaintenance"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Maintenance Mode
                                </FormLabel>
                                <FormDescription>
                                  Enable maintenance mode to prevent users from accessing the site.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          <Save className="mr-2 h-4 w-4" />
                          Save General Settings
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notifications Settings */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure when and how you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...notificationForm}>
                      <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Email Notifications
                                </FormLabel>
                                <FormDescription>
                                  Receive notifications via email.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="newPropertyNotification"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  New Property Alerts
                                </FormLabel>
                                <FormDescription>
                                  Get notified when a new property is listed.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="newUserNotification"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  New User Alerts
                                </FormLabel>
                                <FormDescription>
                                  Get notified when a new user registers.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="newInquiryNotification"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  New Inquiry Alerts
                                </FormLabel>
                                <FormDescription>
                                  Get notified when a new inquiry is submitted.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="marketingEmails"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Marketing Emails
                                </FormLabel>
                                <FormDescription>
                                  Receive marketing and promotional emails.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          <Save className="mr-2 h-4 w-4" />
                          Save Notification Settings
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Security Settings */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Configure security options and access control.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...securityForm}>
                      <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                        <FormField
                          control={securityForm.control}
                          name="requireMfa"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Require MFA
                                </FormLabel>
                                <FormDescription>
                                  Require multi-factor authentication for all admin users.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={securityForm.control}
                          name="passwordPolicy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password Policy</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select password policy" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="low">Low (8+ characters)</SelectItem>
                                  <SelectItem value="medium">Medium (8+ chars, mixed case, numbers)</SelectItem>
                                  <SelectItem value="high">High (12+ chars, mixed case, numbers, symbols)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Set the password complexity requirements for users.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={securityForm.control}
                          name="sessionTimeout"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Session Timeout</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select session timeout" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="30min">30 Minutes</SelectItem>
                                  <SelectItem value="1hour">1 Hour</SelectItem>
                                  <SelectItem value="4hours">4 Hours</SelectItem>
                                  <SelectItem value="1day">1 Day</SelectItem>
                                  <SelectItem value="1week">1 Week</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                How long users stay logged in before requiring re-authentication.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={securityForm.control}
                          name="maxLoginAttempts"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Login Attempts</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select maximum login attempts" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="3">3 Attempts</SelectItem>
                                  <SelectItem value="5">5 Attempts</SelectItem>
                                  <SelectItem value="10">10 Attempts</SelectItem>
                                  <SelectItem value="unlimited">Unlimited</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Maximum failed login attempts before account lockout.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          <Save className="mr-2 h-4 w-4" />
                          Save Security Settings
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Integrations Settings */}
              <TabsContent value="integrations">
                <Card>
                  <CardHeader>
                    <CardTitle>Integration Settings</CardTitle>
                    <CardDescription>
                      Configure third-party service integrations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...integrationForm}>
                      <form onSubmit={integrationForm.handleSubmit(onIntegrationSubmit)} className="space-y-6">
                        <FormField
                          control={integrationForm.control}
                          name="googleApiKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Google API Key</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormDescription>
                                API Key for Google Maps and other Google services.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={integrationForm.control}
                          name="googleAnalyticsId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Google Analytics ID</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX" />
                              </FormControl>
                              <FormDescription>
                                Your Google Analytics tracking ID.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={integrationForm.control}
                          name="facebookPixelId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Facebook Pixel ID</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                Your Facebook Pixel tracking ID.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={integrationForm.control}
                          name="mailchimpApiKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mailchimp API Key</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormDescription>
                                API Key for Mailchimp integration.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={integrationForm.control}
                          name="stripePublicKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stripe Public Key</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                Stripe publishable key for payment processing.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={integrationForm.control}
                          name="enableSocialLogin"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Enable Social Login
                                </FormLabel>
                                <FormDescription>
                                  Allow users to sign in with social media accounts.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          <Save className="mr-2 h-4 w-4" />
                          Save Integration Settings
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSettings;
