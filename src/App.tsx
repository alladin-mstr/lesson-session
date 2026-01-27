import { useState, useEffect } from "react"
import { Presentation } from "@/components/Presentation"
import { QuizHost } from "@/components/quiz/QuizHost"
import { QuizPlayer } from "@/components/quiz/QuizPlayer"

function getRoute(): string {
  return window.location.hash.replace(/^#/, "") || "/"
}

function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  if (route === "/quiz/host") return <QuizHost />
  if (route === "/quiz/play") return <QuizPlayer />
  return <Presentation />
}

export default App
