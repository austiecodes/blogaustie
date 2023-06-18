import clsx from 'clsx'
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Austie',
    template: '%s | Austie',
  },
  description: "Austie",
  openGraph: {
    title: 'Austie',
    description: 'Just Me',
    url: 'https://blog.austie.me',
    siteName: 'Austie',
    images: [
      {
        url: 'https://blog.austie.com',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: 'https://blog.austie.me',
    types: {
      'application/rss+xml': [{ url: 'feed.xml', title: 'RSS' }],
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-US">
      <body className="bg-bg-color text-fg-color">
        <div
          aria-hidden
          className={clsx(
            'pointer-events-none fixed top-0 z-10 h-14 w-full select-none md:h-20',
            'bg-gradient-to-t from-transparent to-bg-color/80',
            'backdrop-blur',
            'gradient-mask-b-0'
          )}
        />
        <div className="flex h-full flex-col items-center justify-start font-serif md:relative md:flex-row md:items-start md:justify-center md:pb-12 md:pt-32">
          {children}
        </div>
      </body>
    </html>
  )
}
