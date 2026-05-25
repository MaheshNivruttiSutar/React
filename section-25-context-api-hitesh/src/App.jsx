import ThemeButton from "./ThemeButton"
import Card from "./Card"
import { ThemeProvider } from "./context/theme"
import { useState, useEffect } from "react"


function App() {
  const [themeMode, setThemeMode] = useState("light")
  const darkTheme = () => {
    setThemeMode("dark")
  }
  const lightTheme = () => {
    setThemeMode("light")
  }


  //Actual change in theme
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(themeMode)
  }, [themeMode])

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>

      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeButton />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>

    </ThemeProvider>
  )
}

export default App
