import '@/katex/katex.min.css'
import { Mdx } from '@/components/mdx'
import { allArticles } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Balancer } from 'react-wrap-balancer'
import { ToC, TocProps } from './toc'
import { DateTime } from '@/components/date-time'

export async function generateStaticParams() {
  return allArticles.map(article => ({
    slug: article.slug,
  }))
}

type ArticleProps = {
  params: {
    slug: string
  }
}
export async function generateMetadata({
  params,
}: ArticleProps): Promise<Metadata | undefined> {
  const article = allArticles.find(article => article.slug === params.slug)
  if (!article) {
    return
  }

  const { title, description, date, slug, lang } = article

  const ogImage = `https://blog.austie.me/og?title=${title}&lang=${lang}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      url: `https://blog.austie.me/writing/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
  }
}

export default async function Article({ params }: ArticleProps) {
  const article = allArticles.find(article => article.slug === params.slug)

  if (!article) {
    notFound()
  }

  const headings = getHeadings(article.body.raw)

  return (
    <>
      <ToC headings={headings} />
      <main className="w-full px-6 md:w-[60ch]">
        <div>
          <div className="sticky z-20 pt-6 md:block">
            <DateTime date={article.date} />
            <h1 className="mb-5 mt-1 text-3xl font-bold dark:text-white">
              <Balancer>{article.title}</Balancer>
            </h1>
          </div>
          <Mdx code={article.body.code} />
        </div>
      </main>
    </>
  )
}

function getHeadings(mdContent: string): TocProps['headings'] {
  const content = removeCodeBlockFromMd(mdContent)
  const headingRegex = /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/gm;
  const headings = [...content.matchAll(headingRegex)].map(r => ({
    level: r[1].length,
    text: r[2],
  }))
  return headings
}

// https://github.com/K-Sato1995/react-toc/blob/af8569d6dff8cbfb685b5614f7952eb19dceab73/src/utils.ts#LL39C1-L39C6
function removeCodeBlockFromMd(mdContent: string): string {
  const codeBlockRegex = new RegExp(
    '((````[a-z]*\n[\\s\\S]*?\n````)|(```[a-z]*\n[\\s\\S]*?\n```)|(~~~[a-z]*\n[\\s\\S]*?\n~~~))',
    'gms'
  )
  return mdContent.replace(codeBlockRegex, '')
}
