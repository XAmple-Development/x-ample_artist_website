import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'X-AMPLE — Electronic Producer & Live Act' },
      {
        name: 'description',
        content:
          'X-Ample is an electronic producer and live act. Stream the full catalogue on Spotify, catch the tour, and join the signal list.',
      },
      { name: 'theme-color', content: '#0c0a09' },
      { property: 'og:title', content: 'X-AMPLE' },
      {
        property: 'og:description',
        content: 'Electronic producer & live act. Stream every release on Spotify.',
      },
      { property: 'og:type', content: 'music.musician' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="atmosphere" aria-hidden="true" />
        {children}
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <Scripts />
      </body>
    </html>
  )
}
