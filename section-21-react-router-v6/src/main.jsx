import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { HashRouter } from 'react-router-dom'
// import { unstable_HistoryRouter } from 'react-router-dom'
// import { MemoryRouter } from 'react-router-dom'
// import { StaticRouter } from 'react-router-dom/server'
// import { NativeRouter } from 'react-router-dom/native'



//NativeRouter: This router is used to render the native applications.
//Why?: Because the NativeRouter uses the native APIs to render the pages, which is not supported by the BrowserRouter.
//Note: The NativeRouter is not supported in the latest version of react-router-dom.
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <NativeRouter location="/">
//       <App />
//     </NativeRouter>
//   </StrictMode>,
// )

//StaticRouter: This router is used to render the server-side React applications.
//Why?: Because the StaticRouter uses the static files to render the pages, which is not supported by the BrowserRouter.
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <StaticRouter location="/">
//       <App />
//     </StaticRouter>
//   </StrictMode>,
// )



//MemoryRouter: We are storing this in memory/history not in url
//Why?: Because the MemoryRouter uses the memory to store the history of the pages, which is not supported by the BrowserRouter.
//Note: The MemoryRouter is not supported in the latest version of react-router-dom.
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>
//   </StrictMode>,
// )


// //unstable_HistoryRouter: http://localhost:5173/contact#/about
// //Why?: Because the unstable_HistoryRouter uses the browser's history API to navigate between pages, which is not supported by the HashRouter.
//Note: The unstable_HistoryRouter is not supported in the latest version of react-router-dom.
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <unstable_HistoryRouter>
//       <App />
//     </unstable_HistoryRouter>
//   </StrictMode>,
// )


// //HashRouter: http://localhost:5173/contact#/about
// //Why?: Because the HashRouter uses the hash symbol to navigate between pages, which is not supported by the unstable_HistoryRouter.
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   </StrictMode>,
// )

// // BrowserRouter: https://localhost:5173/about
// //Why?: Because the BrowserRouter uses the browser's history API to navigate between pages, which is not supported by the HashRouter.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
