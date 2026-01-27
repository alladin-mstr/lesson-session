import { useState, useEffect, useRef } from "react"
import { QRCode } from "@/components/QRCode"

// ─── Shared DemoProps for coupled list-demo interaction ───
export interface DemoProps {
  activeIndex?: number
  onActiveIndexChange?: (index: number) => void
}

// ─── Slide 1: Title — animated brain/lightbulb concept ───
export function TitleDemo() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 900)
    const t3 = setTimeout(() => setPhase(3), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="relative w-72 scale-reveal select-none">
      <div className="space-y-5">
        {/* Complexity → Simplicity visual */}
        <div className="relative">
          {/* Tangled lines (complexity) fading out */}
          <div className={`transition-all duration-1000 ${phase >= 2 ? 'opacity-20 scale-95' : 'opacity-100 scale-100'}`}>
            <svg viewBox="0 0 280 160" className="w-full" fill="none">
              <path d="M20 80 C60 20, 100 140, 140 80 S220 20, 260 80" stroke="hsl(36, 40%, 30%)" strokeWidth="1.5" opacity="0.5" />
              <path d="M20 60 C80 120, 120 20, 180 90 S240 40, 260 70" stroke="hsl(36, 40%, 30%)" strokeWidth="1.5" opacity="0.4" />
              <path d="M20 100 C50 50, 110 130, 160 60 S230 110, 260 90" stroke="hsl(36, 40%, 30%)" strokeWidth="1.5" opacity="0.3" />
              {/* Clean line emerging */}
              <path
                d="M20 80 L260 80"
                stroke="hsl(36, 80%, 56%)"
                strokeWidth="2"
                strokeDasharray="240"
                strokeDashoffset={phase >= 2 ? "0" : "240"}
                style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
              {/* Endpoint dot */}
              <circle
                cx="260" cy="80" r="4"
                fill="hsl(36, 80%, 56%)"
                className={`transition-all duration-500 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="flex items-center justify-between px-2">
          <div className={`transition-all duration-700 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground/40">Complex</p>
          </div>
          <div className={`transition-all duration-700 delay-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-amber-500/60">Obvious</p>
          </div>
        </div>

        {/* Concept cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "◯", label: "Clarity", delay: 0.6 },
            { icon: "△", label: "Structure", delay: 0.8 },
            { icon: "□", label: "Simplicity", delay: 1.0 },
          ].map((item, i) => (
            <div
              key={i}
              className="stagger-item text-center p-3 rounded-lg border border-border/50 hover:border-amber-500/20 transition-colors duration-300"
              style={{ animationDelay: `${item.delay}s` }}
            >
              <span className="text-lg text-amber-500/50 block mb-1">{item.icon}</span>
              <span className="font-mono text-[9px] text-muted-foreground/50">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Slide 2: Ice Breaker Quiz — QR code to join ───
export function AboutBookDemo() {
  const [joinUrl, setJoinUrl] = useState("")

  useEffect(() => {
    setJoinUrl(`${window.location.origin}/#/quiz/play`)
  }, [])

  if (!joinUrl) return null

  return (
    <div className="w-full max-w-sm space-y-4 scale-reveal">
      <div className="demo-surface">
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">
            quiz.join
          </span>
        </div>
        <div className="p-6 flex flex-col items-center gap-4">
          <div className="p-4 bg-white rounded-2xl">
            <QRCode value={joinUrl} size={180} fgColor="#0d0b08" bgColor="#ffffff" />
          </div>
          <div className="text-center space-y-1">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-amber-500/60">
              Scan to join
            </p>
            <p className="font-mono text-xs text-muted-foreground break-all max-w-[280px]">
              {joinUrl}
            </p>
          </div>
          <a
            href="/#/quiz/host"
            className="mt-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity inline-block"
          >
            Open Host View →
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 3: Core Principle — think vs don't think comparison ───
export function CorePrincipleDemo() {
  const [showGood, setShowGood] = useState(false)

  return (
    <div className="w-full max-w-md space-y-4 scale-reveal">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setShowGood(false)}
          className={`font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
            !showGood
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-secondary text-muted-foreground border border-transparent hover:border-border"
          }`}
        >
          Makes you think
        </button>
        <button
          onClick={() => setShowGood(true)}
          className={`font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
            showGood
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-secondary text-muted-foreground border border-transparent hover:border-border"
          }`}
        >
          Self-evident
        </button>
      </div>
      <div className="demo-surface">
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">example.com</span>
        </div>
        <div className="p-5 space-y-4 transition-all duration-500 h-[200px]">
          {!showGood ? (
            <>
              <div className="flex gap-2 text-[11px] font-mono text-muted-foreground/40">
                <span className="hover:text-muted-foreground cursor-pointer">Section A</span>
                <span>|</span>
                <span className="hover:text-muted-foreground cursor-pointer">Section B</span>
                <span>|</span>
                <span className="hover:text-muted-foreground cursor-pointer">Section C</span>
                <span>|</span>
                <span className="hover:text-muted-foreground cursor-pointer">More...</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  To proceed, please click{" "}
                  <span className="cursor-pointer hover:bg-amber-500/20 hover:text-foreground transition-all duration-200 px-0.5 rounded">
                    here
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <nav className="flex gap-4 text-[12px] font-body">
                <span className="text-amber-400 border-b border-amber-400 pb-0.5 cursor-pointer">Home</span>
                <span className="text-foreground/70 hover:text-foreground cursor-pointer">Products</span>
                <span className="text-foreground/70 hover:text-foreground cursor-pointer">About</span>
                <span className="text-foreground/70 hover:text-foreground cursor-pointer">Contact</span>
              </nav>
              <div className="space-y-2">
                <p className="text-sm text-foreground">
                  Ready to get started?
                </p>
                <button className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, hsl(36, 80%, 50%), hsl(36, 80%, 40%))", color: "#0d0b08" }}>
                  Sign Up Free
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Slide 3: What's the Point? — Linear & 1Password showcase ───
export function WhatsThePointDemo() {
  const [active, setActive] = useState(0)
  const products = [
    { name: "Linear", tagline: "Same problem, radically better UX — teams migrated.", img: "/linear.png" },
    { name: "1Password", tagline: "You just click and the click is mindless.", img: "/1password.png" },
  ]

  return (
    <div className="w-full max-w-md space-y-3 scale-reveal">
      <div className="flex gap-2">
        {products.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`font-mono text-[11px] px-3 py-1.5 rounded-full transition-all duration-300 ${
              active === i
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-secondary text-muted-foreground border border-transparent hover:border-border"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="demo-surface">
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">
            {products[active].name.toLowerCase()}.com
          </span>
        </div>
        <div className="p-4 space-y-3">
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={products[active].img}
              alt={products[active].name}
              className="w-full object-cover transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 4: Guidelines — interactive checklist ───
export function GuidelinesDemo() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false, false, false])
  const toggle = (i: number) => {
    setChecked(prev => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }
  const icons = ["◐", "↻", "⊞", "☞", "⊘", "✂"]
  const score = checked.filter(Boolean).length

  return (
    <div className="w-full max-w-xs space-y-3 scale-reveal">
      <div className="demo-surface">
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">audit.check</span>
        </div>
        <div className="p-4 space-y-1">
          {[
            "Visual hierarchy",
            "Conventions used",
            "Defined areas",
            "Obvious clickables",
            "No question marks",
            "Words omitted",
          ].map((label, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="stagger-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-300 hover:bg-secondary/50 group"
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <span className={`flex-shrink-0 w-5 h-5 rounded border text-[10px] flex items-center justify-center transition-all duration-300 ${
                checked[i]
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                  : "border-border text-transparent group-hover:border-muted-foreground/40"
              }`}>
                {checked[i] ? "✓" : ""}
              </span>
              <span className="text-lg select-none opacity-50">{icons[i]}</span>
              <span className={`font-body text-sm transition-all duration-300 ${
                checked[i] ? "text-foreground" : "text-muted-foreground"
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
        {/* Score bar */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-muted-foreground/60">Usability Score</span>
            <span className="font-mono text-[10px] text-amber-400">{score}/6</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(score / 6) * 100}%`,
                background: score === 6
                  ? "linear-gradient(90deg, hsl(120, 60%, 35%), hsl(120, 60%, 50%))"
                  : "linear-gradient(90deg, hsl(36, 80%, 30%), hsl(36, 80%, 56%))"
              }}
            />
          </div>
          {score === 6 && (
            <p className="font-mono text-[10px] text-green-400/80 mt-2 text-center animate-pulse">
              Perfect usability audit!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Slide 5: Scanning — heatmap simulation ───
export function ScanningDemo() {
  const [scanning, setScanning] = useState(false)
  const [heatPoints, setHeatPoints] = useState<{ x: number; y: number; intensity: number }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scanning) return
    setHeatPoints([])
    const fPattern = [
      { x: 15, y: 12, intensity: 1.0 }, { x: 35, y: 12, intensity: 0.9 }, { x: 55, y: 12, intensity: 0.7 },
      { x: 75, y: 12, intensity: 0.4 },
      { x: 15, y: 30, intensity: 0.9 }, { x: 35, y: 30, intensity: 0.7 }, { x: 55, y: 30, intensity: 0.3 },
      { x: 15, y: 48, intensity: 0.8 }, { x: 30, y: 48, intensity: 0.5 },
      { x: 15, y: 62, intensity: 0.6 }, { x: 15, y: 76, intensity: 0.4 },
      { x: 15, y: 88, intensity: 0.2 },
    ]
    const timers: ReturnType<typeof setTimeout>[] = []
    fPattern.forEach((point, i) => {
      timers.push(setTimeout(() => {
        setHeatPoints(prev => [...prev, point])
      }, i * 200))
    })
    timers.push(setTimeout(() => setScanning(false), fPattern.length * 200 + 500))
    return () => timers.forEach(clearTimeout)
  }, [scanning])

  return (
    <div className="w-full max-w-sm space-y-3 scale-reveal">
      <button
        onClick={() => { setScanning(true); setHeatPoints([]) }}
        className="font-mono text-xs px-4 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all duration-200"
      >
        {scanning ? "Scanning..." : "▶ Simulate F-Pattern Scan"}
      </button>
      <div className="demo-surface" ref={containerRef}>
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">webpage.html</span>
        </div>
        <div className="relative p-5 min-h-[220px]">
          {/* Fake page content */}
          <div className="space-y-3 pointer-events-none">
            <div className="h-3 bg-foreground/10 rounded w-3/4" />
            <div className="h-2 bg-foreground/5 rounded w-full" />
            <div className="h-2 bg-foreground/5 rounded w-5/6" />
            <div className="h-2 bg-foreground/5 rounded w-2/3" />
            <div className="h-6" />
            <div className="h-3 bg-foreground/8 rounded w-2/3" />
            <div className="h-2 bg-foreground/5 rounded w-full" />
            <div className="h-2 bg-foreground/5 rounded w-4/5" />
            <div className="h-6" />
            <div className="h-2 bg-foreground/5 rounded w-1/2" />
            <div className="h-2 bg-foreground/5 rounded w-3/4" />
            <div className="h-2 bg-foreground/5 rounded w-1/3" />
          </div>
          {/* Heat overlay */}
          {heatPoints.map((point, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: "50px",
                height: "50px",
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle, hsla(36, 90%, 55%, ${point.intensity * 0.5}) 0%, transparent 70%)`,
                animation: "fadeUp 0.3s ease-out forwards",
              }}
            />
          ))}
        </div>
      </div>
      {heatPoints.length > 0 && !scanning && (
        <p className="font-mono text-[10px] text-amber-400/60 text-center">
          Users scan in an F-pattern — top and left get the most attention
        </p>
      )}
    </div>
  )
}

// ─── Slide 6: Navigation — interactive breadcrumb/nav demo ───
export function NavigationDemo() {
  const [activePage, setActivePage] = useState("Home")
  const pages = ["Home", "Products", "Electronics", "Headphones"]

  const getBreadcrumb = () => {
    const idx = pages.indexOf(activePage)
    return pages.slice(0, idx + 1)
  }

  return (
    <div className="w-full max-w-sm space-y-3 scale-reveal">
      <div className="demo-surface">
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">shop.example.com</span>
        </div>
        <div className="p-4 space-y-4">
          {/* Site header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="font-display text-lg italic text-amber-400">ShopEx</span>
            <div className="flex gap-3 text-xs font-body">
              {["Home", "Products", "About", "Contact"].map(item => (
                <button
                  key={item}
                  onClick={() => item === "Home" || item === "Products" ? setActivePage(item) : null}
                  className={`transition-colors duration-200 ${
                    activePage === item ? "text-amber-400" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[11px]">
            {getBreadcrumb().map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-muted-foreground/30">/</span>}
                <button
                  onClick={() => setActivePage(crumb)}
                  className={`transition-colors duration-200 ${
                    i === getBreadcrumb().length - 1
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-amber-400"
                  }`}
                >
                  {crumb}
                </button>
              </span>
            ))}
          </div>
          {/* Page content */}
          <div className="space-y-2 min-h-[100px]">
            <h4 className="font-display text-xl italic text-foreground">{activePage}</h4>
            {activePage === "Home" && (
              <div className="grid grid-cols-2 gap-2">
                {["Products", "Electronics"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActivePage(cat)}
                    className="text-left p-2.5 rounded-lg border border-border hover:border-amber-500/30 transition-all duration-200 group"
                  >
                    <p className="text-xs text-foreground/80 group-hover:text-amber-400 transition-colors">{cat} →</p>
                  </button>
                ))}
              </div>
            )}
            {activePage === "Products" && (
              <div className="grid grid-cols-2 gap-2">
                {["Electronics", "Headphones"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActivePage(cat)}
                    className="text-left p-2.5 rounded-lg border border-border hover:border-amber-500/30 transition-all duration-200 group"
                  >
                    <p className="text-xs text-foreground/80 group-hover:text-amber-400 transition-colors">{cat} →</p>
                  </button>
                ))}
              </div>
            )}
            {(activePage === "Electronics" || activePage === "Headphones") && (
              <div className="space-y-2">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg border border-border">
                    <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-xs text-muted-foreground">
                      {activePage === "Electronics" ? "🔌" : "🎧"}
                    </div>
                    <div>
                      <p className="text-xs text-foreground/80">Item {i}</p>
                      <p className="text-[10px] text-muted-foreground">$99.00</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* You are here indicator */}
          <div className="pt-2 border-t border-border">
            <p className="font-mono text-[10px] text-amber-400/50">
              You are here: {getBreadcrumb().join(" → ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 7: Mobile — device frame ───
export function MobileDemo() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="scale-reveal">
      {/* Phone frame */}
      <div className="relative w-52 mx-auto">
        {/* Phone bezel */}
        <div className="rounded-[28px] border-2 border-foreground/10 bg-[#0a0908] p-2 shadow-2xl">
          {/* Notch */}
          <div className="flex justify-center mb-1">
            <div className="w-16 h-4 bg-[#0a0908] rounded-b-xl border border-foreground/5 border-t-0" />
          </div>
          {/* Screen */}
          <div className="rounded-[20px] overflow-hidden bg-background min-h-[340px] flex flex-col">
            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-1.5 text-[8px] text-foreground/50">
              <span>9:41</span>
              <div className="flex gap-1">
                <span>●●●</span>
                <span>WiFi</span>
                <span>100%</span>
              </div>
            </div>
            {/* App content */}
            <div className="flex-1 px-3 py-2 space-y-3">
              <h4 className="font-display text-base italic text-foreground">Discover</h4>
              {/* Search bar — thumb-friendly */}
              <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5">
                <span className="text-muted-foreground/50 text-xs">🔍</span>
                <span className="text-[10px] text-muted-foreground/50">Search anything...</span>
              </div>
              {/* Cards — thumb zone */}
              <div className="space-y-2">
                {["Featured Item", "Popular Now", "New Arrival"].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border hover:border-amber-500/20 transition-all duration-200 cursor-pointer"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-sm"
                      style={{ background: `hsl(36, ${60 + i * 15}%, ${20 + i * 8}%)` }}
                    >
                      {["★", "♦", "◆"][i]}
                    </div>
                    <div>
                      <p className="text-[11px] text-foreground/90 font-medium">{item}</p>
                      <p className="text-[9px] text-muted-foreground">Tap to explore</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Tab bar — large touch targets */}
            <div className="flex items-center justify-around py-2.5 border-t border-border bg-card">
              {["⌂", "◎", "♡", "☰"].map((icon, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`w-10 h-8 flex items-center justify-center rounded-lg text-sm transition-all duration-200 ${
                    activeTab === i ? "text-amber-400 bg-amber-500/10" : "text-muted-foreground"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Thumb zone arc */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-dashed border-green-500/20 rounded-t-full pointer-events-none" />
        <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono text-[9px] text-green-400/40 whitespace-nowrap">
          thumb-friendly zone
        </p>
      </div>
    </div>
  )
}

// ─── Slide 8: Usability Testing — test session mockup ───
export function TestingDemo() {
  const [currentTask, setCurrentTask] = useState(0)
  const [findings, setFindings] = useState<string[]>([])

  const tasks = [
    { task: "Find the contact page", result: "User looked in footer first ✓" },
    { task: "Add item to cart", result: "Hesitated — button unclear ✗" },
    { task: "Check order status", result: "Found easily via nav ✓" },
  ]

  const runTest = () => {
    if (findings.length >= tasks.length) {
      setFindings([])
      setCurrentTask(0)
      return
    }
    setFindings(prev => [...prev, tasks[prev.length].result])
    setCurrentTask(prev => Math.min(prev + 1, tasks.length - 1))
  }

  return (
    <div className="w-full max-w-sm space-y-3 scale-reveal">
      <div className="demo-surface">
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">test-session.log</span>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-amber-500/60">Test Session</p>
              <p className="font-display text-lg italic text-foreground">User #1</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] text-muted-foreground/40">Tasks</p>
              <p className="font-mono text-sm text-foreground">{findings.length}/{tasks.length}</p>
            </div>
          </div>

          {/* Current task */}
          <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <p className="font-mono text-[10px] text-amber-400/60 mb-1">Current Task</p>
            <p className="text-sm text-foreground">
              "{tasks[Math.min(currentTask, tasks.length - 1)].task}"
            </p>
          </div>

          {/* Findings log */}
          <div className="space-y-1.5 min-h-[80px]">
            {findings.map((finding, i) => (
              <div
                key={i}
                className="stagger-item flex items-center gap-2 text-xs"
                style={{ animationDelay: "0s" }}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  finding.includes("✓") ? "bg-green-400" : "bg-red-400"
                }`} />
                <span className="font-mono text-muted-foreground">{finding}</span>
              </div>
            ))}
          </div>

          <button
            onClick={runTest}
            className="w-full py-2.5 rounded-lg font-mono text-xs transition-all duration-300 hover:brightness-110"
            style={{
              background: findings.length >= tasks.length
                ? "hsl(30, 4%, 14%)"
                : "linear-gradient(135deg, hsl(36, 80%, 50%), hsl(36, 80%, 40%))",
              color: findings.length >= tasks.length ? "hsl(30, 8%, 52%)" : "#0d0b08"
            }}
          >
            {findings.length >= tasks.length ? "Reset Session" : "Run Next Task →"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 9: Key Takeaways — impact visual ───
export function TakeawaysDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const items = [
    { icon: "◉", label: "Works well", color: "36, 80%, 56%" },
    { icon: "⧗", label: "Busy users", color: "36, 70%, 46%" },
    { icon: "◬", label: "Invisible design", color: "36, 60%, 40%" },
    { icon: "⊕", label: "Real testing", color: "36, 50%, 35%" },
    { icon: "↗", label: "Small wins", color: "36, 80%, 56%" },
  ]

  return (
    <div className="w-full max-w-xs scale-reveal">
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="stagger-item group relative flex items-center gap-4 px-4 py-3 rounded-xl border border-border/50 transition-all duration-300 cursor-default"
            style={{
              animationDelay: `${0.1 + i * 0.1}s`,
              background: hoveredIndex === i ? `hsla(${item.color}, 0.08)` : "transparent",
              borderColor: hoveredIndex === i ? `hsla(${item.color}, 0.3)` : undefined
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span
              className="text-xl transition-all duration-300"
              style={{ color: hoveredIndex === i ? `hsl(${item.color})` : "hsl(var(--muted-foreground))" }}
            >
              {item.icon}
            </span>
            <span className={`font-body text-sm transition-all duration-300 ${
              hoveredIndex === i ? "text-foreground" : "text-muted-foreground"
            }`}>
              {item.label}
            </span>
            {/* Glow */}
            {hoveredIndex === i && (
              <div
                className="absolute right-3 w-2 h-2 rounded-full"
                style={{ background: `hsl(${item.color})`, boxShadow: `0 0 12px hsla(${item.color}, 0.5)` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Slide 5: Examples — before/after UI demos ───
export function ExamplesDemo({ activeIndex = 0 }: DemoProps) {
  const [googleRevealed, setGoogleRevealed] = useState(false)
  const [selectorFixed, setSelectorFixed] = useState(false)
  const [selectorSelected, setSelectorSelected] = useState<number[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setGoogleRevealed(false)
    setSelectorFixed(false)
    setSelectorSelected([])
  }, [activeIndex])

  const toggleSelector = (i: number) => {
    setSelectorSelected(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  const triggerBounce = () => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
    setTimeout(() => {
      el.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-10px)" },
          { transform: "translateY(3px)" },
          { transform: "translateY(-2px)" },
          { transform: "translateY(0)" },
        ],
        { duration: 500, easing: "ease-out" }
      )
    }, 400)
  }

  return (
    <div className="w-full">
      <div className="demo-surface">
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">
            {["google.com (2004)", "form.example", "scroll.demo"][activeIndex]}
          </span>
        </div>
        <div className="p-4 h-[340px] overflow-y-auto demo-scroll">
          {/* Google before/after */}
          {activeIndex === 0 && (
            <div className="space-y-3">
              <div className="rounded-lg overflow-hidden border border-border">
                <img
                  src={googleRevealed ? "/google-2004-with-footer.png" : "/google-2004-no-footer.png"}
                  alt={googleRevealed ? "Google 2004 with footer" : "Google 2004 without footer"}
                  className="w-full transition-all duration-500"
                />
              </div>
              <button
                onClick={() => setGoogleRevealed(r => !r)}
                className="font-mono text-xs px-4 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all"
              >
                {googleRevealed ? "← Show original" : "▶ Reveal the fix"}
              </button>
            </div>
          )}

          {/* Checkbox vs radio */}
          {activeIndex === 1 && (
            <div className="space-y-3">
              <p className="font-mono text-[10px] text-muted-foreground/60 mb-2">
                Select your languages
              </p>
              <div className="space-y-2">
                {["TypeScript", "Python", "Go", "Rust"].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => toggleSelector(i)}
                    className="flex items-center gap-3 w-full text-left group"
                  >
                    <span
                      className={`w-5 h-5 flex-shrink-0 flex items-center justify-center border transition-all duration-300 ${
                        selectorFixed ? "rounded-sm" : "rounded-full"
                      } ${
                        selectorSelected.includes(i)
                          ? "border-amber-500 bg-amber-500/20"
                          : "border-border group-hover:border-muted-foreground/50"
                      }`}
                    >
                      {selectorSelected.includes(i) && (
                        <span className="text-amber-400 text-[10px]">✓</span>
                      )}
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {opt}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectorFixed(f => !f)}
                className="font-mono text-xs px-4 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all"
              >
                {selectorFixed ? "← Show circles" : "▶ Fix: use squares"}
              </button>
            </div>
          )}

          {/* Bounce effect */}
          {activeIndex === 2 && (
            <div className="space-y-3">
              <div
                ref={scrollRef}
                className="h-[200px] overflow-y-auto rounded-lg border border-border p-2 space-y-1.5 demo-scroll"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded border border-border/30"
                  >
                    <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center font-mono text-[10px] text-muted-foreground/50">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-foreground/8 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={triggerBounce}
                className="font-mono text-xs px-4 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all"
              >
                ▶ Scroll to bottom
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Slide 6: Diminishing Goodwill — bad UX examples ───
export function DiminishGoodwillDemo({ activeIndex = 0 }: DemoProps) {
  const cities = ["Manila", "Cebu", "Tokyo", "Singapore"]
  const dates = ["Jan 28, 2026", "Jan 29, 2026", "Jan 30, 2026"]
  const [fromCity, setFromCity] = useState("Manila")
  const [toCity, setToCity] = useState("")
  const [departDate, setDepartDate] = useState("Jan 28, 2026")

  useEffect(() => {
    setFromCity("Manila")
    setToCity("")
    setDepartDate("Jan 28, 2026")
  }, [activeIndex])

  const matchCity = (input: string) =>
    cities.find(c => c.toLowerCase().startsWith(input.toLowerCase()))

  return (
    <div className="w-full">
      <div className="demo-surface">
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">
            bad-ux.example
          </span>
        </div>
        <div className="p-4 h-[340px] overflow-y-auto demo-scroll">
          {/* Hidden pricing */}
          {activeIndex === 0 && (
            <div className="space-y-3">
              <p className="font-mono text-[10px] text-muted-foreground/40 mb-2">
                Pricing Plans
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["Basic", "Pro", "Enterprise"].map(tier => (
                  <div
                    key={tier}
                    className="p-3 rounded-lg border border-border text-center space-y-2"
                  >
                    <p className="text-xs font-medium text-foreground/80">
                      {tier}
                    </p>
                    <p className="text-lg font-bold text-muted-foreground/30">
                      $???
                    </p>
                    <button className="w-full text-[10px] py-1.5 rounded bg-secondary text-muted-foreground/50">
                      Contact Sales
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking form: Bad vs Good side-by-side */}
          {activeIndex === 1 && (
            <div className="space-y-3">
              <p className="font-mono text-[10px] text-muted-foreground/40 mb-1">
                Book a Flight
              </p>
              <div className="grid grid-cols-2 gap-3">
                {/* Bad: no defaults, dropdowns */}
                <div className="space-y-2 p-2.5 rounded-lg border border-red-500/20 bg-red-500/5">
                  <p className="font-mono text-[9px] text-red-400/60 text-center">✗ No defaults</p>
                  <div>
                    <label className="text-[9px] text-muted-foreground/50 block mb-0.5">From</label>
                    <select className="w-full h-7 rounded border border-border bg-background/80 px-1.5 text-[11px] text-muted-foreground">
                      <option value="">Select city...</option>
                      <option>Manila</option>
                      <option>Cebu</option>
                      <option>Tokyo</option>
                      <option>Singapore</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] text-muted-foreground/50 block mb-0.5">To</label>
                    <select className="w-full h-7 rounded border border-border bg-background/80 px-1.5 text-[11px] text-muted-foreground">
                      <option value="">Select city...</option>
                      <option>Manila</option>
                      <option>Cebu</option>
                      <option>Tokyo</option>
                      <option>Singapore</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] text-muted-foreground/50 block mb-0.5">Depart</label>
                    <select className="w-full h-7 rounded border border-border bg-background/80 px-1.5 text-[11px] text-muted-foreground">
                      <option value="">Select date...</option>
                      <option>Jan 28</option>
                      <option>Jan 29</option>
                      <option>Jan 30</option>
                    </select>
                  </div>
                </div>
                {/* Good: smart defaults, autocomplete dropdowns */}
                <div className="space-y-2 p-2.5 rounded-lg border border-green-500/20 bg-green-500/5">
                  <p className="font-mono text-[9px] text-green-400/60 text-center">✓ Smart defaults</p>
                  <div>
                    <label className="text-[9px] text-muted-foreground/50 block mb-0.5">From</label>
                    <input
                      list="cities-from"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const m = matchCity(fromCity)
                          if (m) setFromCity(m)
                        }
                      }}
                      className="w-full h-7 rounded border border-border bg-background/80 px-1.5 text-[11px] text-foreground/80 focus:outline-none focus:border-amber-500/50"
                    />
                    <datalist id="cities-from">
                      {cities.map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                  <div>
                    <label className="text-[9px] text-muted-foreground/50 block mb-0.5">To</label>
                    <input
                      list="cities-to"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const m = matchCity(toCity)
                          if (m) setToCity(m)
                        }
                      }}
                      placeholder="Type destination..."
                      className="w-full h-7 rounded border border-border bg-background/80 px-1.5 text-[11px] text-foreground/80 placeholder:text-muted-foreground/30 focus:outline-none focus:border-amber-500/50"
                    />
                    <datalist id="cities-to">
                      {cities.map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                  <div>
                    <label className="text-[9px] text-muted-foreground/50 block mb-0.5">Depart</label>
                    <input
                      list="dates-depart"
                      value={departDate}
                      onChange={(e) => setDepartDate(e.target.value)}
                      className="w-full h-7 rounded border border-border bg-background/80 px-1.5 text-[11px] text-foreground/80 focus:outline-none focus:border-amber-500/50"
                    />
                    <datalist id="dates-depart">
                      {dates.map(d => <option key={d} value={d} />)}
                    </datalist>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Too many fields */}
          {activeIndex === 2 && (
            <div className="space-y-2">
              <p className="font-mono text-[10px] text-muted-foreground/40 mb-1">
                Create Account
              </p>
              {[
                "Full Name",
                "Email",
                "Phone",
                "Fax Number",
                "Date of Birth",
                "Mother's Maiden Name",
                "Shoe Size",
              ].map(field => (
                <div key={field}>
                  <label className="text-[10px] text-muted-foreground/50 block mb-0.5">
                    {field} <span className="text-red-400">*</span>
                  </label>
                  <div className="h-7 rounded border border-border bg-secondary/30" />
                </div>
              ))}
            </div>
          )}

          {/* Amateurish login — old Bootstrap 3 style */}
          {activeIndex === 3 && (
            <div className="space-y-3">
              <div
                className="p-4 space-y-3"
                style={{
                  background: "#f5f5f5",
                  borderRadius: "3px",
                  border: "1px solid #ddd",
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                <h4 className="text-sm font-bold" style={{ color: "#333" }}>
                  Sign In
                </h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] block mb-0.5" style={{ color: "#666" }}>Email address</label>
                    <input
                      type="text"
                      placeholder="Enter email"
                      className="w-full h-7 px-2 text-[11px] focus:outline-none"
                      style={{ border: "1px solid #ccc", borderRadius: "3px", background: "#fff", color: "#555" }}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] block mb-0.5" style={{ color: "#666" }}>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full h-7 px-2 text-[11px] focus:outline-none"
                      style={{ border: "1px solid #ccc", borderRadius: "3px", background: "#fff", color: "#555" }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" style={{ accentColor: "#337ab7" }} />
                  <span className="text-[10px]" style={{ color: "#666" }}>Remember me</span>
                </div>
                <button
                  className="w-full py-1.5 text-xs font-bold"
                  style={{ background: "#337ab7", color: "#fff", border: "1px solid #2e6da4", borderRadius: "3px" }}
                >
                  Sign in
                </button>
                <p className="text-[9px] text-center" style={{ color: "#999" }}>
                  &copy; 2014 MyWebApp
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Slide 7: Building Goodwill — good UX examples ───
export function BuildGoodwillDemo({ activeIndex = 0 }: DemoProps) {
  const [submitPhase, setSubmitPhase] = useState(0)
  const [selectedDoc, setSelectedDoc] = useState(1)
  const [emailValue, setEmailValue] = useState("john@")
  const [ctaClicked, setCtaClicked] = useState(false)

  useEffect(() => {
    setSubmitPhase(0)
    setSelectedDoc(1)
    setEmailValue("john@")
    setCtaClicked(false)
  }, [activeIndex])

  const runSubmitAnimation = () => {
    if (submitPhase > 0) return
    setSubmitPhase(1)
    setTimeout(() => setSubmitPhase(2), 1000)
    setTimeout(() => setSubmitPhase(3), 2000)
    setTimeout(() => setSubmitPhase(0), 3500)
  }

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  return (
    <div className="w-full">
      <div className="demo-surface">
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">
            good-ux.example
          </span>
        </div>
        <div className="p-4 h-[340px] overflow-y-auto demo-scroll">
          {/* Obvious CTA */}
          {activeIndex === 0 && (
            <div className="flex flex-col items-center justify-center space-y-4 h-full">
              <p className="text-sm text-muted-foreground text-center">
                Ready to get started?
              </p>
              <button
                onClick={() => setCtaClicked(true)}
                className={`px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105 hover:brightness-110 ${ctaClicked ? "scale-95" : ""}`}
                style={{
                  background: ctaClicked
                    ? "hsl(120, 50%, 35%)"
                    : "linear-gradient(135deg, hsl(36, 80%, 50%), hsl(36, 80%, 40%))",
                  color: ctaClicked ? "white" : "#0d0b08",
                }}
              >
                {ctaClicked ? "✓ Welcome aboard!" : "Start Free Trial →"}
              </button>
            </div>
          )}

          {/* Transparent checkout */}
          {activeIndex === 1 && (
            <div className="space-y-3">
              <p className="font-mono text-[10px] text-muted-foreground/40 mb-2">
                Order Summary
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Product</span>
                  <span>$49.00</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>$5.99</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (8%)</span>
                  <span>$3.92</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Discount</span>
                  <span className="text-green-400">−$10.00</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between text-foreground font-bold">
                  <span>Total</span>
                  <span>$48.91</span>
                </div>
              </div>
            </div>
          )}

          {/* Smart recommendation — subsidy based on profile */}
          {activeIndex === 2 && (
            <div className="space-y-3">
              <div className="p-2.5 rounded-lg border border-border/50 bg-secondary/20">
                <p className="font-mono text-[9px] text-muted-foreground/50 mb-1">Applicant Profile</p>
                <div className="flex gap-3 text-[10px] text-muted-foreground">
                  <span>Age: 28</span>
                  <span>Income: $32k</span>
                  <span>Dependents: 2</span>
                </div>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground/40">
                Recommended Subsidies
              </p>
              <div className="space-y-1.5">
                {["Housing Assistance", "Childcare Subsidy", "Education Grant", "Utility Relief"].map(
                  (subsidy, i) => (
                    <button
                      key={subsidy}
                      onClick={() => setSelectedDoc(i)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all text-left ${
                        selectedDoc === i
                          ? "border-amber-500/40 bg-amber-500/10"
                          : "border-border hover:border-border/80"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center text-[10px] ${
                          selectedDoc === i
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-secondary text-muted-foreground/40"
                        }`}
                      >
                        {selectedDoc === i ? "★" : "○"}
                      </div>
                      <span
                        className={`text-xs ${
                          selectedDoc === i
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {subsidy}
                      </span>
                      {i === 1 && (
                        <span className="ml-auto font-mono text-[9px] text-amber-400/60 px-2 py-0.5 rounded-full bg-amber-500/10">
                          Best match
                        </span>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Animated submit */}
          {activeIndex === 3 && (
            <div className="flex flex-col items-center justify-center space-y-4 h-full">
              <button
                onClick={runSubmitAnimation}
                disabled={submitPhase > 0}
                className="px-8 py-3 rounded-xl text-sm font-medium transition-all duration-500 min-w-[200px]"
                style={{
                  background:
                    submitPhase === 3
                      ? "hsl(120, 50%, 35%)"
                      : submitPhase > 0
                        ? "hsl(36, 60%, 30%)"
                        : "linear-gradient(135deg, hsl(36, 80%, 50%), hsl(36, 80%, 40%))",
                  color:
                    submitPhase > 0 ? "hsl(36, 80%, 80%)" : "#0d0b08",
                }}
              >
                {submitPhase === 0 && "Submit Application"}
                {submitPhase === 1 && "⟳ Sending..."}
                {submitPhase === 2 && "◎ Reviewing..."}
                {submitPhase === 3 && "✓ Done!"}
              </button>
            </div>
          )}

          {/* Inline validation — editable */}
          {activeIndex === 4 && (
            <div className="space-y-3">
              <p className="font-mono text-[10px] text-muted-foreground/40 mb-2">
                Profile Settings
              </p>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-muted-foreground/60 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full h-8 rounded-lg border border-border bg-secondary/30 px-3 text-xs text-foreground/80 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground/60 block mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className={`w-full h-8 rounded-lg border px-3 text-xs text-foreground/80 focus:outline-none ${
                      isValidEmail(emailValue)
                        ? "border-green-500/40 bg-green-500/5"
                        : "border-red-500/40 bg-red-500/5"
                    }`}
                  />
                  {!isValidEmail(emailValue) && (
                    <p className="text-[10px] text-red-400 mt-1">
                      Please enter a valid email address.
                    </p>
                  )}
                  {isValidEmail(emailValue) && (
                    <p className="text-[10px] text-green-400 mt-1">
                      ✓ Looks good!
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground/60 block mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full h-8 rounded-lg border border-border bg-secondary/30 px-3 text-xs text-foreground/80 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Slide 8: Demo — animated ticket form with callout annotations ───
export function DemoGraphic() {
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const issues = [
    { label: "No defaults", top: "58px", left: "-8px" },
    { label: "Flat hierarchy", top: "12px", left: "-8px" },
    { label: "Weak CTA", top: "310px", left: "-8px" },
    { label: "No validation", top: "140px", left: "-8px" },
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setHighlightIdx(i % issues.length)
      i++
    }, 2000)
    return () => clearInterval(interval)
  }, [issues.length])

  return (
    <div className="w-full max-w-xl space-y-3 scale-reveal">
      <div className="demo-surface relative" style={{ overflow: "visible" }}>
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">
            tickets.app — before
          </span>
        </div>
        <div className="p-4 space-y-2 relative">
          {/* Animated callout badges */}
          {issues.map((issue, i) => (
            <div
              key={i}
              className="absolute z-10 transition-all duration-500"
              style={{
                top: issue.top,
                right: issue.left,
                opacity: highlightIdx === i ? 1 : 0,
                transform: highlightIdx === i ? "translateX(0)" : "translateX(8px)",
              }}
            >
              <span className="font-mono text-[9px] text-red-400 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                {issue.label}
              </span>
            </div>
          ))}

          <p className="text-sm font-medium text-foreground/80 mb-2">
            Create Ticket
          </p>
          <div>
            <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Title</label>
            <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center">
              <span className="text-xs text-muted-foreground/30">Enter title...</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Description</label>
            <div className="h-12 rounded border border-border bg-secondary/30 px-2 pt-1.5">
              <span className="text-xs text-muted-foreground/30">Enter description...</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Status</label>
              <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground/30">Select...</span>
                <span className="text-muted-foreground/30 text-[10px]">▼</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Priority</label>
              <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground/30">Select...</span>
                <span className="text-muted-foreground/30 text-[10px]">▼</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Start Date</label>
              <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center">
                <span className="text-[11px] text-muted-foreground/30">mm/dd/yyyy</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Due Date</label>
              <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center">
                <span className="text-[11px] text-muted-foreground/30">mm/dd/yyyy</span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Category</label>
            <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground/30">Select...</span>
              <span className="text-muted-foreground/30 text-[10px]">▼</span>
            </div>
          </div>
          <button className="w-full py-1.5 mt-1 rounded text-xs font-medium bg-secondary text-muted-foreground/50">
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 8b: Ticket Form Canvas — plain form for live editing ───
export function TicketFormCanvas() {
  return (
    <div className="w-full max-w-xl scale-reveal">
      <div className="demo-surface">
        <div className="demo-browser-bar">
          <div className="demo-browser-dot bg-red-500/70" />
          <div className="demo-browser-dot bg-yellow-500/70" />
          <div className="demo-browser-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground/50">
            tickets.app
          </span>
        </div>
        <div className="p-4 space-y-2">
          <p className="text-sm font-medium text-foreground/80 mb-2">
            Create Ticket
          </p>
          <div>
            <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Title</label>
            <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center">
              <span className="text-xs text-muted-foreground/30">Enter title...</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Description</label>
            <div className="h-12 rounded border border-border bg-secondary/30 px-2 pt-1.5">
              <span className="text-xs text-muted-foreground/30">Enter description...</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Status</label>
              <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground/30">Select...</span>
                <span className="text-muted-foreground/30 text-[10px]">▼</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Priority</label>
              <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground/30">Select...</span>
                <span className="text-muted-foreground/30 text-[10px]">▼</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Start Date</label>
              <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center">
                <span className="text-[11px] text-muted-foreground/30">mm/dd/yyyy</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Due Date</label>
              <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center">
                <span className="text-[11px] text-muted-foreground/30">mm/dd/yyyy</span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground/50 block mb-0.5">Category</label>
            <div className="h-7 rounded border border-border bg-secondary/30 px-2 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground/30">Select...</span>
              <span className="text-muted-foreground/30 text-[10px]">▼</span>
            </div>
          </div>
          <button className="w-full py-1.5 mt-1 rounded text-xs font-medium bg-secondary text-muted-foreground/50">
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 9: So Now What? — abstract chaos → clarity visual ───
export function SoNowWhatDemo() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 1200)
    const t3 = setTimeout(() => setPhase(3), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="w-full max-w-xs scale-reveal">
      <div className="demo-surface">
        <div className="p-6 space-y-5">
          {/* Abstract: tangled paths → single clear path */}
          <div className="relative">
            <svg viewBox="0 0 260 140" className="w-full" fill="none">
              {/* Tangled chaotic lines fading out */}
              <g className={`transition-all duration-1000 ${phase >= 2 ? "opacity-10" : "opacity-50"}`}>
                <path d="M20 30 C60 90, 80 10, 120 70 S180 20, 220 60" stroke="hsl(0, 40%, 45%)" strokeWidth="1.5" />
                <path d="M30 80 C70 20, 100 110, 150 40 S200 90, 240 50" stroke="hsl(0, 40%, 45%)" strokeWidth="1.5" opacity="0.7" />
                <path d="M15 55 C55 100, 90 15, 130 85 S190 30, 245 75" stroke="hsl(0, 40%, 45%)" strokeWidth="1.5" opacity="0.5" />
                <path d="M25 100 C65 40, 110 120, 160 55 S210 100, 240 30" stroke="hsl(0, 40%, 45%)" strokeWidth="1.5" opacity="0.3" />
              </g>
              {/* Clean line emerging */}
              <path
                d="M20 70 C80 70, 100 70, 130 70 S200 70, 240 70"
                stroke="hsl(36, 80%, 56%)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="220"
                strokeDashoffset={phase >= 1 ? "0" : "220"}
                style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
              {/* Endpoint glow */}
              <circle
                cx="240" cy="70" r="5"
                fill="hsl(36, 80%, 56%)"
                className={`transition-all duration-500 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}
              />
              <circle
                cx="240" cy="70" r="12"
                fill="none"
                stroke="hsl(36, 80%, 56%)"
                strokeWidth="1"
                className={`transition-all duration-700 ${phase >= 2 ? "opacity-30" : "opacity-0"}`}
              />
            </svg>
          </div>
          {/* Labels */}
          <div className="flex items-center justify-between px-1">
            <div className={`transition-all duration-700 ${phase >= 1 ? "opacity-100" : "opacity-0"}`}>
              <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground/30">noise</p>
            </div>
            <div className={`transition-all duration-700 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
              <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-amber-500/50">clarity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 10: Thank You — closing animation ───
export function ThankYouDemo() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 1200)
    const t3 = setTimeout(() => setPhase(3), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="w-full max-w-xs scale-reveal">
      <div className="demo-surface">
        <div className="p-6 space-y-5 text-center">
          <div className="space-y-3">
            <div className={`transition-all duration-700 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl"
                style={{ background: "linear-gradient(135deg, hsl(36, 80%, 50%), hsl(36, 60%, 35%))" }}>
                <span style={{ color: "#0d0b08" }}>✦</span>
              </div>
            </div>
            <div className={`transition-all duration-700 delay-300 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="font-display text-2xl italic text-foreground">
                Think less.
              </p>
              <p className="font-display text-2xl italic text-amber-400">
                Design better.
              </p>
            </div>
            <div className={`transition-all duration-700 delay-500 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="w-8 h-px bg-amber-500/30 mx-auto my-3" />
              <p className="font-mono text-[10px] text-muted-foreground/50 tracking-wide">
                — Steve Krug
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
