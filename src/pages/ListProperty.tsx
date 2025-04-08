
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ListProperty = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentTab, setCurrentTab] = useState("basic");
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    price: "",
    location: "",
    address: "",
    area: "",
    energyClass: "",
    description: "",
    // Contact information
    sellerName: "",
    sellerEmail: "",
    sellerPhone: "",
    // Additional fields for sustainability
    certifications: [] as string[],
    sustainabilityFeatures: [] as string[],
    // SEO fields
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // Here you would typically send the data to your backend
    toast({
      title: "Property submitted",
      description: "Your property listing has been submitted for review. We will contact you shortly.",
    });
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">List Your Property</h1>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="contact">Contact Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter property title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (SEK)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter full address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area (m²)</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="Enter area in square meters"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="energyClass">Energy Class</Label>
                  <Select
                    value={formData.energyClass}
                    onValueChange={(value) => setFormData({ ...formData, energyClass: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select energy class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                      <SelectItem value="G">G</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter property description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sellerName">Your Name</Label>
                      <Input
                        id="sellerName"
                        placeholder="Enter your name"
                        value={formData.sellerName}
                        onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sellerEmail">Email</Label>
                      <Input
                        id="sellerEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.sellerEmail}
                        onChange={(e) => setFormData({ ...formData, sellerEmail: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sellerPhone">Phone Number</Label>
                      <Input
                        id="sellerPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.sellerPhone}
                        onChange={(e) => setFormData({ ...formData, sellerPhone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-4 border-t border-gray-200 mt-6">
              <Button type="submit" className="w-full bg-eco-green hover:bg-eco-darkGreen">
                Submit Property
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for submitting your property listing. Our team will review your submission and contact you within 24-48 hours at the provided contact information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleConfirm}>Understood</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ListProperty;
