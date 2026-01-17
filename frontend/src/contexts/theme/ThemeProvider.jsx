import { createContext, useContext, useState } from "react"
import { colorTheme } from "../../utils/theme.js"

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(colorTheme)

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeProvider

export const useTheme = () => useContext(ThemeContext)