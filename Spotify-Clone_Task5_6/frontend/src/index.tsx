import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import AuthProvider from './providers/AuthProvider'
import darkTheme from './theme'

// Import your Publishable Key
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
    <AuthProvider>
     <BrowserRouter>
      <App />
      </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>,
)