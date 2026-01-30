import { useState, useEffect, useCallback } from "react"
import { slides } from "@/slides/slides"
import type { Slide } from "@/types/slide"
import {
  TitleDemo,
  AboutBookDemo,
  CorePrincipleDemo,
  WhatsThePointDemo,
  ExamplesDemo,
  DiminishGoodwillDemo,
  BuildGoodwillDemo,
  DemoGraphic,
  TicketFormCanvas,
  SoNowWhatDemo,
  ThankYouDemo,
} from "@/components/InteractiveDemos"
import type { DemoProps } from "@/components/InteractiveDemos"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_MAP: Record<number, React.ComponentType<any>> = {
  1: TitleDemo,
  2: AboutBookDemo,
  3: WhatsThePointDemo,
  4: CorePrincipleDemo,
  5: ExamplesDemo,
  6: DiminishGoodwillDemo,
  7: BuildGoodwillDemo,
  8: DemoGraphic,
  11: TicketFormCanvas,
  9: SoNowWhatDemo,
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

// ─── Rich Text Helper (parses **bold**) ───────────────────────────────────────

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="text-foreground font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

// ─── Slide Content Renderer ────────────────────────────────────────────────────

function SlideContent({ slide }: { slide: Slide }) {
  const DemoComponent = DEMO_MAP[slide.id]

  if (slide.type === "title") {
    return <TitleSlide slide={slide} demo={DemoComponent} />
  }
  if (slide.type === "quote") {
    return <QuoteSlide slide={slide} demo={DemoComponent} />
  }
  if (slide.type === "list") {
    return <ListSlide slide={slide} demo={DemoComponent} />
  }
  if (slide.type === "book") {
    return <BookSlide slide={slide} />
  }
  return <ContentSlide slide={slide} demo={DemoComponent} />
}

// ─── Book Slide ────────────────────────────────────────────────────────────────

function BookSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex items-center justify-between gap-12">
      {/* Left: Book cover */}
      <div className="flex-shrink-0 scale-reveal">
        {slide.image && (
          <img
            src={slide.image}
            alt="Book cover"
            className="w-48 h-auto rounded-lg shadow-2xl shadow-black/40 border border-amber-500/10"
          />
        )}
      </div>
      {/* Center: Text */}
      <div className="flex-1 space-y-6">
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
          <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-md">
            {typeof slide.content === "string" ? <RichText text={slide.content} /> : slide.content[0]}
          </p>
        </div>
        <div className="fade-up fade-up-delay-2 flex items-center gap-3 pt-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: `hsla(36, 80%, 56%, ${0.6 - i * 0.2})` }}
            />
          ))}
        </div>
      </div>
      {/* Right: Timeline */}
      <div className="flex-shrink-0 scale-reveal" style={{ animationDelay: "0.2s" }}>
        {slide.secondaryImage && (
          <img
            src={slide.secondaryImage}
            alt="Timeline"
            className="w-64 h-auto rounded-lg border border-border/50"
          />
        )}
      </div>
    </div>
  )
}

// ─── Title Slide ───────────────────────────────────────────────────────────────

function TitleSlide({ slide, demo: Demo }: { slide: Slide; demo?: React.ComponentType<DemoProps> }) {
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
      {/* Right: Photo */}
      <div className="flex-shrink-0 scale-reveal">
        <img
          src="/me.png"
          alt={typeof slide.content === "string" ? slide.content : "Presenter"}
          className="w-56 h-56 rounded-2xl object-cover object-top border-2 border-amber-500/20 shadow-xl shadow-black/30"
        />
        <p className="font-mono text-[10px] text-foreground/70 text-center mt-3">
          {typeof slide.content === "string" ? slide.content : ""}
        </p>
      </div>
    </div>
  )
}

// ─── Quote Slide (interactive "Don't make me think!" highlight) ────────────────

function QuoteSlide({ slide, demo: Demo }: { slide: Slide; demo?: React.ComponentType<DemoProps> }) {
  const [revealed, setRevealed] = useState(false)
  const [crossed, setCrossed] = useState<boolean[]>([false, false, false])

  const allCrossed = crossed.every(Boolean)

  useEffect(() => {
    if (allCrossed) {
      const t = setTimeout(() => setRevealed(true), 600)
      return () => clearTimeout(t)
    }
  }, [allCrossed])

  const toggleCross = (i: number) => {
    setCrossed(prev => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  const wrongAnswers = [
    "Nothing important should ever be more than two clicks away",
    "Speak the user's language",
    "Be consistent",
  ]

  return (
    <div className="flex items-start justify-between gap-14">
      <div className="flex-1 max-w-2xl space-y-6">
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
          <blockquote className="font-body text-lg text-muted-foreground leading-relaxed border-l-2 border-amber-500/30 pl-6 space-y-4">
            <p>&ldquo;What&rsquo;s the most important thing I should do if I want to make sure my site or app is easy to use?&rdquo;</p>
            <div>
              <p className="mb-2">It&rsquo;s not:</p>
              <ul className="space-y-1 ml-2">
                {wrongAnswers.map((answer, i) => (
                  <li
                    key={i}
                    onClick={() => toggleCross(i)}
                    className={`transition-all duration-500 cursor-pointer select-none ${
                      crossed[i]
                        ? "line-through text-muted-foreground/30 decoration-red-400/60"
                        : "text-muted-foreground hover:text-foreground/70"
                    }`}
                  >
                    &ldquo;{answer}&rdquo;
                  </li>
                ))}
              </ul>
            </div>
            <p className={`transition-all duration-700 ${allCrossed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
              It&rsquo;s&hellip;{" "}
              <span
                className={`inline transition-all duration-1000 font-display italic ${
                  revealed
                    ? "text-amber-400 text-2xl"
                    : "text-muted-foreground"
                }`}
                style={revealed ? {
                  textShadow: "0 0 20px hsla(36, 80%, 56%, 0.4), 0 0 40px hsla(36, 80%, 56%, 0.2)"
                } : undefined}
              >
                Don&rsquo;t make me think!
              </span>
            </p>
          </blockquote>
        </div>
      </div>
      {Demo && (
        <div className="flex-shrink-0 fade-up fade-up-delay-2">
          <Demo />
        </div>
      )}
    </div>
  )
}

// ─── Content Slide ─────────────────────────────────────────────────────────────

function ContentSlide({ slide, demo: Demo }: { slide: Slide; demo?: React.ComponentType<DemoProps> }) {
  const [copied, setCopied] = useState(false)
  const isThankYou = slide.id === 10
  const isDemo = slide.id === 8
  const isCanvas = slide.id === 11

  const demoPrompt = `Redesign this ticket creation form to improve usability:
- Add smart defaults for status (Open) and priority (Medium)
- Set start date to today by default
- Create clear visual hierarchy — group related fields
- Make the submit button prominent with a clear CTA
- Add inline validation and helpful placeholders
- Consider which fields are truly required vs optional`

  const copyPrompt = () => {
    navigator.clipboard.writeText(demoPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isCanvas && Demo) {
    return (
      <div className="flex items-center justify-center">
        <div className="fade-up">
          <Demo />
        </div>
      </div>
    )
  }

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
          {typeof slide.content === "string" ? <RichText text={slide.content} /> : slide.content[0]}
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
            {typeof slide.content === "string" ? <RichText text={slide.content} /> : slide.content[0]}
          </p>
        </div>
        {/* Demo slide: copy-pasteable prompt */}
        {isDemo && (
          <div className="fade-up fade-up-delay-2 space-y-2">
            <div className="relative rounded-lg border border-border bg-secondary/30 p-3 overflow-hidden">
              <pre className="font-mono text-[10px] text-muted-foreground leading-relaxed whitespace-pre-wrap">{demoPrompt}</pre>
              <button
                onClick={copyPrompt}
                className="absolute top-2 right-2 font-mono text-[9px] px-2 py-1 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
        {/* Decorative element (non-demo slides) */}
        {!isDemo && (
          <div className="fade-up fade-up-delay-2 flex items-center gap-2 pt-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: `hsla(36, 80%, 56%, ${0.6 - i * 0.2})` }}
              />
            ))}
          </div>
        )}
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

function ListSlide({ slide, demo: Demo }: { slide: Slide; demo?: React.ComponentType<DemoProps> }) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Helper to render title with Goodwill tooltip
  const renderTitle = (title: string) => {
    if (title.includes("Goodwill")) {
      const parts = title.split("Goodwill")
      return (
        <>
          {parts[0]}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="underline decoration-amber-500/40 decoration-dotted underline-offset-4 cursor-help">
                  Goodwill
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-card border border-border text-foreground">
                <p className="text-sm">
                  <strong className="text-amber-400">Goodwill</strong> is the reservoir of positive feelings users have toward your site. Every frustration drains it; every delightful experience fills it back up.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {parts[1]}
        </>
      )
    }
    return title
  }

  return (
    <div className="flex items-start justify-between gap-10">
      {/* Left: List content */}
      <div className="flex-1 max-w-xl space-y-6">
        <div className="fade-up">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500/50 mb-3">
            {slide.number}
          </p>
          <h2 className="font-display text-5xl italic text-foreground leading-tight">
            {renderTitle(slide.title)}
          </h2>
        </div>
        <div className="w-10 h-px bg-amber-500/20 fade-up fade-up-delay-1" />
        <ul className="space-y-0.5">
          {Array.isArray(slide.content) &&
            slide.content.map((item, index) => (
              <li
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`stagger-item flex items-center gap-4 py-3 cursor-pointer border-b border-border/30 last:border-0 transition-all duration-300 -mx-3 px-3 rounded-lg ${
                  activeIndex === index
                    ? "bg-amber-500/10 border-transparent"
                    : "hover:bg-secondary/30"
                }`}
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <span
                  className={`font-mono text-[10px] w-5 text-right flex-shrink-0 transition-colors duration-300 ${
                    activeIndex === index ? "text-amber-400" : "text-amber-500/40"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`font-body text-base transition-colors duration-300 ${
                  activeIndex === index ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {item}
                </span>
              </li>
            ))}
        </ul>
      </div>
      {/* Right: Interactive demo — fixed width to prevent layout shift */}
      {Demo && (
        <div className="w-[420px] flex-shrink-0 fade-up fade-up-delay-2">
          <Demo activeIndex={activeIndex} onActiveIndexChange={setActiveIndex} />
        </div>
      )}
    </div>
  )
}
