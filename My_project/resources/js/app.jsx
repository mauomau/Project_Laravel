import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { NotificationProvider } from './Components/Notification'
import { ThemeProvider } from "./components/theme-provider"
import { ModeToggle } from "./components/mode-toggle"


createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <NotificationProvider>
                <Theme>
                    <ModeToggle />
                    <App {...props} />
                </Theme>
            </NotificationProvider>
        )
    },
})


function Theme({ children }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  )
}

export { Theme };

function toggleTheme({ theme = null }) {
    const { setTheme, currentTheme } = ModeToggle();
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    // Example implementation - you can expand this based on your needs
    setTheme(theme || nextTheme); // toggle between light and dark
}

// Make toggleTheme available globally or export it if needed elsewhere
window.toggleTheme = toggleTheme;
// Also export it for use in other modules if needed
export { toggleTheme };