
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useCallback, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const imageLoader = async (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = reject;
  });
};

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean[]>(images.map(() => true));
  const [api, setApi] = useState<CarouselApi | null>(null);
  
  const handleSelect = useCallback(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  const scrollToIndex = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  // Mark image as loaded
  const handleImageLoad = (index: number) => {
    setIsLoading(prev => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };
  
  // Initialize the thumbnail scroll position when currentIndex changes
  useEffect(() => {
    if (currentIndex === undefined) return;
    
    const thumbnailContainer = document.getElementById('thumbnails-container');
    if (!thumbnailContainer) return;
    
    const thumbnail = thumbnailContainer.children[currentIndex] as HTMLElement;
    if (!thumbnail) return;
    
    const containerWidth = thumbnailContainer.offsetWidth;
    const thumbnailLeft = thumbnail.offsetLeft;
    const thumbnailWidth = thumbnail.offsetWidth;
    
    // Center the selected thumbnail
    thumbnailContainer.scrollLeft = thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2;
  }, [currentIndex]);
  
  return (
    <div className="space-y-4">
      <Carousel 
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        onScroll={handleSelect}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="relative">
              <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-lg">
                {isLoading[index] && (
                  <Skeleton className="absolute inset-0 z-10" />
                )}
                <img
                  src={image}
                  alt={`${title} - image ${index + 1}`}
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    isLoading[index] ? "opacity-0" : "opacity-100"
                  )}
                  onLoad={() => handleImageLoad(index)}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      
      <div 
        id="thumbnails-container"
        className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-muted"
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={cn(
              "relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden snap-start transition-all duration-200",
              currentIndex === index 
                ? "ring-2 ring-eco-green scale-105 z-10" 
                : "hover:ring-1 hover:ring-eco-green/50",
              currentIndex !== index && "opacity-70 hover:opacity-100"
            )}
          >
            <img 
              src={image} 
              alt={`${title} - thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {currentIndex === index && (
              <div className="absolute inset-x-0 bottom-0 h-1 bg-eco-green" />
            )}
          </button>
        ))}
      </div>
      
      <div className="text-sm text-muted-foreground text-center">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default PropertyGallery;
