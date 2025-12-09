import React from 'react'; // FIX: Import React for JSX usage (Line 5)
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import App from './App'; // FIX: Ensure App is imported (Line 7)
import { ThemeProvider } from './contexts/ThemeContext'; // Import your ThemeProvider
import './index.css'; // Import global styles

// FIX: 'root' is not defined (Line 4)
// This line uses the new React 18+ way to get the root element and create the root
const rootElement = document.getElementById('root'); 
const root = ReactDOM.createRoot(rootElement);

root.render(
  // The StrictMode is a tool for highlighting potential problems in an application
  <React.StrictMode>
    {/* Wrap the entire application in the ThemeProvider */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);