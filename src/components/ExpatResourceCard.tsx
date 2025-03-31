
import { FileText, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ResourceProps {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  icon: "document" | "link" | "calculator" | "map";
}

const ExpatResourceCard = ({ resource }: { resource: ResourceProps }) => {
  const getIcon = () => {
    switch (resource.icon) {
      case "document":
        return <FileText className="h-10 w-10 text-eco-green" />;
      case "link":
        return <LinkIcon className="h-10 w-10 text-eco-blue" />;
      case "calculator":
        return (
          <div className="h-10 w-10 bg-eco-green rounded-full flex items-center justify-center text-white font-bold">
            %
          </div>
        );
      case "map":
        return (
          <div className="h-10 w-10 bg-eco-blue rounded-full flex items-center justify-center text-white font-bold">
            📍
          </div>
        );
      default:
        return <FileText className="h-10 w-10 text-eco-green" />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex flex-col items-center mb-4">
          {getIcon()}
          <Badge className="mt-3" variant="outline">
            {resource.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg text-center mb-3">{resource.title}</h3>
        <p className="text-muted-foreground text-sm text-center">
          {resource.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full border-eco-green text-eco-green hover:bg-eco-green hover:text-white"
          onClick={() => window.open(resource.link, "_blank")}
        >
          View Resource
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExpatResourceCard;
