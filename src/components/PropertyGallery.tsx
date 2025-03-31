
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useCallback } from "react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  
  const handleSelect = useCallback(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  const scrollToIndex = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);
  
  return (
    <div className="space-y-4">
      <Carousel 
        className="w-full"
        opts={{
          align: "start",
          startIndex: currentIndex,
        }}
        setApi={setApi}
        onSelect={handleSelect}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={image}
                  alt={`${title} - image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
              currentIndex === index ? "ring-2 ring-eco-green" : ""
            }`}
          >
            <img 
              src={image} 
              alt={`${title} - thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
