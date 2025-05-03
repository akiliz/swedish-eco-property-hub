
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

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean[]>(images.map(() => true));
  const [api, setApi] = useState<CarouselApi | null>(null);
  
  // Define the onSelect handler with the correct signature to match CarouselOnSelectHandler
  const handleSelect = useCallback((api: CarouselApi) => {
    const selectedIndex = api.selectedScrollSnap();
    setCurrentIndex(selectedIndex);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  // Mark image as loaded
  const handleImageLoad = useCallback((index: number) => {
    setIsLoading(prev => {
      if (!prev[index]) return prev; // Skip update if already loaded
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  }, []);
  
  // Center selected thumbnail with memoization for better performance
  const centerSelectedThumbnail = useCallback((index: number) => {
    const thumbnailContainer = document.getElementById('thumbnails-container');
    if (!thumbnailContainer) return;
    
    const thumbnail = thumbnailContainer.children[index] as HTMLElement;
    if (!thumbnail) return;
    
    const containerWidth = thumbnailContainer.offsetWidth;
    const thumbnailLeft = thumbnail.offsetLeft;
    const thumbnailWidth = thumbnail.offsetWidth;
    
    thumbnailContainer.scrollLeft = thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2;
  }, []);
  
  // Use effect for centering thumbnail with debounce
  useEffect(() => {
    if (currentIndex === undefined) return;
    
    const timeoutId = setTimeout(() => {
      centerSelectedThumbnail(currentIndex);
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, [currentIndex, centerSelectedThumbnail]);
  
  return (
    <div className="space-y-4">
      <Carousel 
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        onSelect={handleSelect}
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
                  loading={index <= 2 ? "eager" : "lazy"}
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
        className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-muted hide-scrollbar"
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
            aria-label={`View image ${index + 1}`}
            aria-current={currentIndex === index ? "true" : "false"}
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
