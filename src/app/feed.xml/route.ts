import { allArticles } from 'contentlayer/generated'
import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: 'Austie',
    description: "Austie",
    site_url: 'https://blog.austie.me',
    feed_url: 'https://blog.austie.me/feed.xml',
    language: 'en-US',
    image_url: 'https://blog.austie.me/og.png',
  })

  const articles = allArticles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  articles.forEach(article => {
    feed.item({
      title: article.title,
      url: `https://blog.austie.me/writing/${article.slug}`,
      description: article.description ?? '',
      date: new Date(article.date),
      enclosure: {
        url: `https://blog.austie.me/og?title=${article.title}&lang=${article.lang}`, 
      },
    })
  })

  return new Response(feed.xml(), {
    headers: {
      'content-type': 'application/xml',
    },
  })
}
