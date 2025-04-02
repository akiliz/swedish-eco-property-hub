import { User, Phone, Mail, Check, Award } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface AgentProps {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  fmiLicense: string;
  languages: string[];
  specializations: string[];
  imageUrl: string;
  propertiesSold: number;
  verified: boolean;
}

const AgentCard = ({ agent }: { agent: AgentProps }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center p-6 border-b">
        <div className="relative">
          <img
            src={agent.imageUrl}
            alt={agent.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-eco-green"
            loading="lazy"
            decoding="async"
          />
          {agent.verified && (
            <div className="absolute bottom-0 right-0 bg-eco-green text-white rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
        <h3 className="font-semibold text-lg mt-4">{agent.name}</h3>
        <p className="text-muted-foreground">{agent.title}</p>

        <div className="flex items-center mt-2">
          <Award className="h-4 w-4 text-eco-green mr-1" />
          <span className="text-sm font-medium">FMI License: {agent.fmiLicense}</span>
        </div>

        <div className="mt-3 flex gap-1 flex-wrap justify-center">
          {agent.languages.map((language, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {language}
            </Badge>
          ))}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center">
            <Mail className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-sm">{agent.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-sm">{agent.phone}</span>
          </div>
          <div className="pt-2">
            <p className="text-sm font-medium mb-2">Specializations:</p>
            <div className="flex flex-wrap gap-1">
              {agent.specializations.map((spec, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-eco-gray">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <p className="text-sm text-muted-foreground">
              Properties sold: <span className="font-semibold text-foreground">{agent.propertiesSold}</span>
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link to={`/agents/${agent.id}`} className="w-full">
          <Button 
            variant="outline"
            className="w-full border-eco-green text-eco-green hover:bg-eco-green hover:text-white"
          >
            Contact Agent
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;