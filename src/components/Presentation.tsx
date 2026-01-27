import { useState, useEffect, useCallback } from "react"
import { slides } from "@/slides/slides"
import type { Slide } from "@/types/slide"
import {
  TitleDemo,
  AboutBookDemo,
  CorePrincipleDemo,
  GuidelinesDemo,
  ScanningDemo,
  NavigationDemo,
  MobileDemo,
  TestingDemo,
  TakeawaysDemo,
  ThankYouDemo,
} from "@/components/InteractiveDemos"

const DEMO_MAP: Record<number, () => JSX.Element | null> = {
  1: TitleDemo,
  2: AboutBookDemo,
  3: CorePrincipleDemo,
  4: GuidelinesDemo,
  5: ScanningDemo,
  6: NavigationDemo,
  7: MobileDemo,
  8: TestingDemo,
  9: TakeawaysDemo,
  10: ThankYouDemo,
}

export function Presentation() {
  const getInitialSlide = () => {
    const params = new URLSearchParams(window.location.search)
    const slideParam = params.get("slide")
    if (slideParam) {
      const slideIndex = parseInt(slideParam, 10) - 1
      if (slideIndex >= 0 && slideIndex < slides.length) {
        return slideIndex
      }
    }
    return 0
  }

  const [currentSlide, setCurrentSlide] = useState(getInitialSlide)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [slideKey, setSlideKey] = useState(0)

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide((prev) => {
      if (index === prev) return prev
      setDirection(index > prev ? "right" : "left")
      setSlideKey(k => k + 1)
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.set("slide", (index + 1).toString())
      window.history.pushState({}, "", newUrl)
      return index
    })
  }, [])

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev < slides.length - 1) {
        const next = prev + 1
        setDirection("right")
        setSlideKey(k => k + 1)
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set("slide", (next + 1).toString())
        window.history.pushState({}, "", newUrl)
        return next
      }
      return prev
    })
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev > 0) {
        const next = prev - 1
        setDirection("left")
        setSlideKey(k => k + 1)
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set("slide", (next + 1).toString())
        window.history.pushState({}, "", newUrl)
        return next
      }
      return prev
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      else if (e.key === "ArrowRight") goToNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrevious])

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const slideParam = params.get("slide")
      if (slideParam) {
        const slideIndex = parseInt(slideParam, 10) - 1
        if (slideIndex >= 0 && slideIndex < slides.length) {
          setCurrentSlide(slideIndex)
          setSlideKey(k => k + 1)
        }
      } else {
        setCurrentSlide(0)
        setSlideKey(k => k + 1)
      }
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const slide = slides[currentSlide]
  const progress = ((currentSlide + 1) / slides.length) * 100

  return (
    <div className="grain-overlay flex h-screen w-screen flex-col bg-background relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="ambient-glow"
        style={{
          background: "hsl(36, 80%, 45%)",
          top: "20%",
          right: "-10%",
        }}
      />
      <div
        className="ambient-glow"
        style={{
          background: "hsl(24, 60%, 30%)",
          bottom: "10%",
          left: "-15%",
          animationDelay: "4s",
        }}
      />

      {/* Progress bar at top */}
      <div className="progress-track relative z-10">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between px-10 py-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/50">
            DMMT
          </span>
          <span className="text-muted-foreground/20">|</span>
          <span className="font-mono text-[10px] text-muted-foreground/40">
            {slide.number}
          </span>
        </div>
        <div className="font-mono text-[10px] text-muted-foreground/40">
          {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      {/* Main slide area */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-10 overflow-hidden">
        <div className="w-full max-w-6xl">
          <div key={slideKey} className={`slide-enter-${direction}`}>
            <SlideContent slide={slide} />
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="relative z-10 flex items-center justify-between px-10 pb-6 pt-2">
        {/* Left: Keyboard hint */}
        <div className="flex items-center gap-2">
          <kbd className="font-mono text-[9px] text-muted-foreground/30 border border-border/50 rounded px-1.5 py-0.5">
            ←
          </kbd>
          <kbd className="font-mono text-[9px] text-muted-foreground/30 border border-border/50 rounded px-1.5 py-0.5">
            →
          </kbd>
        </div>

        {/* Center: Dot navigation */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`nav-dot ${index === currentSlide ? "active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Right: Slide title hint */}
        <p className="font-mono text-[9px] text-muted-foreground/30 max-w-[160px] text-right truncate">
          {slide.title}
        </p>
      </div>
    </div>
  )
}

// ─── Slide Content Renderer ────────────────────────────────────────────────────

function SlideContent({ slide }: { slide: Slide }) {
  const DemoComponent = DEMO_MAP[slide.id]

  if (slide.type === "title") {
    return <TitleSlide slide={slide} demo={DemoComponent} />
  }
  if (slide.type === "list") {
    return <ListSlide slide={slide} demo={DemoComponent} />
  }
  return <ContentSlide slide={slide} demo={DemoComponent} />
}

// ─── Title Slide ───────────────────────────────────────────────────────────────

function TitleSlide({ slide, demo: Demo }: { slide: Slide; demo?: () => JSX.Element | null }) {
  return (
    <div className="flex items-center justify-between gap-16">
      {/* Left: Text */}
      <div className="flex-1 space-y-6">
        <div className="fade-up">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-amber-500/60 mb-6">
            Learning Session
          </p>
        </div>
        <h1 className="fade-up fade-up-delay-1">
          <span className="font-display text-7xl leading-[0.95] italic text-foreground block">
            Don't Make
          </span>
          <span className="font-display text-7xl leading-[0.95] italic block mt-1" style={{ color: "hsl(36, 80%, 56%)" }}>
            Me Think
          </span>
        </h1>
        {slide.subtitle && (
          <p className="fade-up fade-up-delay-2 font-body text-lg text-muted-foreground max-w-md leading-relaxed">
            {slide.subtitle}
          </p>
        )}
        {typeof slide.content === "string" && slide.content && (
          <div className="fade-up fade-up-delay-3 flex items-center gap-4 pt-4">
            <div className="w-10 h-px bg-amber-500/30" />
            <p className="font-mono text-xs text-muted-foreground/60">{slide.content}</p>
          </div>
        )}
      </div>
      {/* Right: Photo + Demo */}
      <div className="flex-shrink-0 flex flex-col items-center gap-6">
        <div className="scale-reveal">
          <img
            src="/me.png"
            alt={typeof slide.content === "string" ? slide.content : "Presenter"}
            className="w-56 h-56 rounded-2xl object-cover object-top border-2 border-amber-500/20 shadow-xl shadow-black/30"
          />
          <p className="font-mono text-[10px] text-foreground/70 text-center mt-3">
            {typeof slide.content === "string" ? slide.content : ""}
          </p>
        </div>
        {Demo && <Demo />}
      </div>
    </div>
  )
}

// ─── Content Slide ─────────────────────────────────────────────────────────────

function ContentSlide({ slide, demo: Demo }: { slide: Slide; demo?: () => JSX.Element | null }) {
  const isThankYou = slide.id === 10

  if (isThankYou) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        <div className="fade-up">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/50 mb-4">{slide.number}</p>
        </div>
        <h2 className="fade-up fade-up-delay-1 font-display text-6xl italic text-foreground">
          {slide.title}
        </h2>
        <p className="fade-up fade-up-delay-2 font-body text-lg text-muted-foreground max-w-lg leading-relaxed">
          {typeof slide.content === "string" ? slide.content : slide.content[0]}
        </p>
        {Demo && (
          <div className="fade-up fade-up-delay-3">
            <Demo />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-start justify-between gap-14">
      {/* Left: Text content */}
      <div className="flex-1 max-w-xl space-y-6">
        <div className="fade-up">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/50 mb-3">
            {slide.number}
          </p>
          <h2 className="font-display text-5xl italic text-foreground leading-tight">
            {slide.title}
          </h2>
        </div>
        <div className="fade-up fade-up-delay-1">
          <div className="w-10 h-px bg-amber-500/20 mb-5" />
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            {typeof slide.content === "string" ? slide.content : slide.content[0]}
          </p>
        </div>
        {/* Decorative element */}
        <div className="fade-up fade-up-delay-2 flex items-center gap-2 pt-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: `hsla(36, 80%, 56%, ${0.6 - i * 0.2})` }}
            />
          ))}
        </div>
      </div>
      {/* Right: Interactive demo */}
      {Demo && (
        <div className="flex-shrink-0 fade-up fade-up-delay-2">
          <Demo />
        </div>
      )}
    </div>
  )
}

// ─── List Slide ────────────────────────────────────────────────────────────────

function ListSlide({ slide, demo: Demo }: { slide: Slide; demo?: () => JSX.Element | null }) {
  return (
    <div className="flex items-start justify-between gap-14">
      {/* Left: List content */}
      <div className="flex-1 max-w-xl space-y-6">
        <div className="fade-up">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/50 mb-3">
            {slide.number}
          </p>
          <h2 className="font-display text-5xl italic text-foreground leading-tight">
            {slide.title}
          </h2>
        </div>
        <div className="w-10 h-px bg-amber-500/20 fade-up fade-up-delay-1" />
        <ul className="space-y-0.5">
          {Array.isArray(slide.content) &&
            slide.content.map((item, index) => (
              <li
                key={index}
                className="stagger-item flex items-center gap-4 py-3 group cursor-default border-b border-border/30 last:border-0"
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <span
                  className="font-mono text-[10px] text-amber-500/40 w-5 text-right flex-shrink-0 group-hover:text-amber-400 transition-colors duration-300"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {item}
                </span>
              </li>
            ))}
        </ul>
      </div>
      {/* Right: Interactive demo */}
      {Demo && (
        <div className="flex-shrink-0 fade-up fade-up-delay-2">
          <Demo />
        </div>
      )}
    </div>
  )
}
