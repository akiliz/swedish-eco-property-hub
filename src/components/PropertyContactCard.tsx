import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";
import { PropertyProps } from "@/components/PropertyCard";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PropertyContactCardProps {
  property: PropertyProps;
}

const PropertyContactCard = ({ property }: PropertyContactCardProps) => {
  const { t } = useLanguage();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("sv-SE").format(price);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the contact form data to your backend
    // For now, we'll just show a success message
    toast({
      title: "Contact request sent",
      description: "The agent will contact you shortly.",
    });
    setIsContactDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="text-3xl font-bold mb-3 text-eco-green">
            <span className="currency-sek">{formatPrice(property.price)}</span>
          </div>

          <Separator className="my-4" />

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Key Information</h3>
            <div className="text-sm grid grid-cols-2 gap-2">
              <div className="text-muted-foreground">Location:</div>
              <div>{property.location}</div>

              <div className="text-muted-foreground">Property type:</div>
              <div>{property.type === "residential" ? "Residential" : "Commercial"}</div>

              <div className="text-muted-foreground">Energy class:</div>
              <div>Class {property.energyClass}</div>

              <div className="text-muted-foreground">Area:</div>
              <div>{property.area} m²</div>

              {property.type === "residential" && (
                <>
                  <div className="text-muted-foreground">Bedrooms:</div>
                  <div>{property.bedrooms}</div>

                  <div className="text-muted-foreground">Bathrooms:</div>
                  <div>{property.bathrooms}</div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button 
              className="bg-eco-green hover:bg-eco-darkGreen"
              onClick={() => setIsContactDialogOpen(true)}
            >
              Contact Agent
            </Button>
          </div>

          <div className="mt-4 text-xs text-muted-foreground flex items-center">
            <Calendar size={14} className="mr-1" />
            Listed on {new Date().toLocaleDateString()}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('contact.title')}</DialogTitle>
            <DialogDescription>
              {t('contact.description')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">{t('form.name')}</Label>
              <Input
                id="name"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                required
              />
            </div>
            <Button type="submit" className="w-full">Send Request</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyContactCard;