import { useState, useEffect, useRef } from "react"
import { QRCode } from "@/components/QRCode"

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
    // Try to load ngrok config for public URL, fallback to current origin
    fetch("/ngrok-config.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((cfg) => {
        if (cfg?.appUrl) {
          setJoinUrl(`${cfg.appUrl}/#/quiz/play`)
        } else {
          setJoinUrl(`${window.location.origin}/#/quiz/play`)
        }
      })
      .catch(() => {
        setJoinUrl(`${window.location.origin}/#/quiz/play`)
      })
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
        <div className="p-5 space-y-4 transition-all duration-500 min-h-[200px]">
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
                <div className="text-sm text-muted-foreground">
                  To proceed, utilize the primary action initiator below.
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground/60 underline cursor-pointer">Submit</span>
                  <span className="text-xs text-muted-foreground/60 cursor-pointer">Process</span>
                  <span className="text-xs text-muted-foreground/40 border border-border px-2 py-0.5 rounded cursor-pointer">
                    Execute Action
                  </span>
                </div>
              </div>
              <p className="font-mono text-[10px] text-red-400/60 mt-4 flex items-center gap-1.5">
                <span className="inline-block w-4 h-4 rounded-full bg-red-500/20 text-red-400 text-center leading-4 text-[9px]">?</span>
                Which one do I click? What does "Execute Action" do?
              </p>
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
              <p className="font-mono text-[10px] text-green-400/60 mt-4 flex items-center gap-1.5">
                <span className="inline-block w-4 h-4 rounded-full bg-green-500/20 text-green-400 text-center leading-4 text-[9px]">✓</span>
                Obvious. No thinking required.
              </p>
            </>
          )}
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
