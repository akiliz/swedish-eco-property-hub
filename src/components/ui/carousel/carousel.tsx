
import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { cn } from "@/lib/utils"
import { CarouselContext, type CarouselApi, type CarouselProps, type CarouselOnSelectHandler } from "./carousel-context"

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      onSelect,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelectHandler = React.useCallback((event?: React.SyntheticEvent<HTMLDivElement, Event>) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
      
      // Call user-provided onSelect callback if it exists
      if (onSelect) {
        if (typeof onSelect === 'function') {
          // Check if it's a plain function (expecting API) or a React event handler
          if (event) {
            (onSelect as React.ReactEventHandler<HTMLDivElement>)(event);
          } else {
            (onSelect as (api: CarouselApi) => void)(api);
          }
        }
      }
    }, [api, onSelect])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      // Call without event for initial setup
      onSelectHandler()
      
      // Setup event listeners
      api.on("reInit", onSelectHandler)
      api.on("select", onSelectHandler)

      return () => {
        api.off("reInit", onSelectHandler)
        api.off("select", onSelectHandler)
      }
    }, [api, onSelectHandler])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          onSelect,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          tabIndex={0}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

export { Carousel }
