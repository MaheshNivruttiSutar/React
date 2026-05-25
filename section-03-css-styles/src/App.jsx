// HOW TO STYLE REACT COMPONENTS USING CSS
//Not including external framework or preprocessor
// ============================================================
// HOW TO STYLE REACT COMPONENTS USING CSS
// (No external framework or preprocessor)
// ============================================================

// ------------------------------------------------------------
// 1) EXTERNAL CSS
// ------------------------------------------------------------
//   - One global stylesheet imported once (e.g. import './index.css')
//   - Class names are GLOBAL — collisions can happen across files
//   - Best for: app-wide resets, typography, theme variables
//
//   index.css
//   ---------
//   .button {
//     background-color: hsl(200, 100%, 50%);
//     color: white;
//     padding: 10px 20px;
//     border: none;
//     border-radius: 6px;
//     cursor: pointer;
//   }
//
//   Button.jsx
//   ----------
//   import './index.css';            // imported in main.jsx, available everywhere
//
//   function Button() {
//     return <button className="button">Click me</button>;
//   }

// ------------------------------------------------------------
// 2) CSS MODULES
// ------------------------------------------------------------
//   - File MUST be named *.module.css  (e.g. Button.module.css)
//   - Imported as an object:  import styles from './Button.module.css'
//   - Class names are SCOPED — Vite auto-hashes them (.button -> .button_a1b2c3)
//   - No naming collisions, ideal for component-level styles
//
//   Button.module.css
//   -----------------
//   .button {
//     background-color: hsl(120, 100%, 35%);
//     color: white;
//     padding: 10px 20px;
//     border: none;
//     border-radius: 6px;
//     cursor: pointer;
//   }
//
//   Button.jsx
//   ----------
//   import styles from './Button.module.css';
//
//   function Button() {
//     return <button className={styles.button}>Click me</button>;
//   }
//
//   // Tip: kebab-case class names need bracket access:
//   //   .my-button  ->  className={styles['my-button']}

// ------------------------------------------------------------
// 3) INLINE STYLES
// ------------------------------------------------------------
//   - Pass a JS object to the `style` prop
//   - Property names are camelCase (background-color -> backgroundColor)
//   - Values are strings; numbers default to "px" for size props
//   - Highest specificity, but NO pseudo-classes (:hover) or media queries
//   - Best for: dynamic values driven by state/props
//
//   Button.jsx
//   ----------
//   function Button() {
//     const styles = {
//       backgroundColor: 'hsl(0, 100%, 50%)',
//       color: 'white',
//       padding: '10px 20px',     // string with units
//       borderRadius: 6,          // number -> "6px"
//       border: 'none',
//       cursor: 'pointer',
//     };
//
//     return <button style={styles}>Click me</button>;
//   }
//
//   // Or inline directly:
//   //   <button style={{ backgroundColor: color, padding: 12 }}>Click</button>



import Button from './Button/Button.jsx';

function App() {
  return (
    <>
      <Button />
    </>
  )
}

export default App
