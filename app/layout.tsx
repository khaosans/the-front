import './globals.css'
import Header from './components/Header'
import { ThemeProvider } from './contexts/ThemeContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>
          <Header />
          {children}
        </body>
      </ThemeProvider>
    </html>
  )
}