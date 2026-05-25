// ============================================================
// useContext Hook — Quick Notes
// ============================================================
//
// 1. WHAT IS IT?
//    - A React Hook that lets a component READ a shared value
//      from a Context — without passing props down manually.
//    - Solves the "prop drilling" problem (passing props through
//      many layers of components just so a deep child can use them).
//
// 2. WHEN TO USE
//    - Theme (dark/light mode)
//    - Logged-in user / authentication info
//    - Language / locale
//    - Any value many components need to read at different depths
//
// 3. THE THREE STEPS
//    Step 1 → Create a Context object
//             const MyContext = createContext(defaultValue);
//
//    Step 2 → Provide a value at a parent level
//             <MyContext.Provider value={something}>
//                 {children}
//             </MyContext.Provider>
//
//    Step 3 → Consume the value in any child (no matter how deep)
//             const value = useContext(MyContext);
//
// 4. BASIC EXAMPLE
//    // theme-context.js
//    export const ThemeContext = createContext("light");
//
//    // App.jsx
//    <ThemeContext.Provider value="dark">
//        <Page />
//    </ThemeContext.Provider>
//
//    // DeepChild.jsx
//    const theme = useContext(ThemeContext);   // "dark"
//
// 5. PROP DRILLING vs CONTEXT
//    Without Context:
//      App → Layout → Header → Navbar → UserAvatar  (user passed every step)
//
//    With Context:
//      App provides user → UserAvatar reads it directly with useContext
//
// 6. RULES
//    - useContext must be called inside a function component or custom hook.
//    - Call only at the top level (not inside loops/conditionals).
//    - The component that calls useContext re-renders whenever the
//      Provider's `value` changes.
//
// 7. COMMON PITFALLS
//    - Forgetting <Provider>: useContext returns the default value.
//    - Re-creating the value object inline causes unnecessary re-renders;
//      memoize with useMemo when needed.
//    - Overusing context for every state — prefer local state when possible.
//
// 8. SHARING UPDATABLE STATE
//    Combine useState + useContext to share state AND a setter:
//
//    const ThemeContext = createContext(null);
//
//    function App() {
//        const [theme, setTheme] = useState("light");
//        return (
//            <ThemeContext.Provider value={{ theme, setTheme }}>
//                <Page />
//            </ThemeContext.Provider>
//        );
//    }
//
//    function Toggle() {
//        const { theme, setTheme } = useContext(ThemeContext);
//        return <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Toggle</button>;
//    }
//
// 9. MENTAL MODEL
//    - Provider = a "broadcast tower" sending a value down the tree.
//    - useContext = a "radio receiver" tuned to that tower.
//    - Any consumer re-renders when the broadcasted value changes.
//
// 10. ONE-LINE SUMMARY
//     useContext = read a shared value from the nearest matching
//                  Provider, anywhere in the component tree, without
//                  prop drilling.
// ============================================================

import ComponentA from './ComponentA.jsx';

function App() {

  return (
    <>
      <ComponentA />
    </>
  )
}

export default App
