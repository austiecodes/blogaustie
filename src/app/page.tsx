import { Nav } from '@/components/nav/nav'
import NextLink from 'next/link'
import Me from './me.mdx'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mb-5 w-full px-6 md:w-[60ch]">
        <article className="prose prose-zinc dark:prose-invert prose-h1:mb-5">
          <h1 className="mobile-header md:static md:my-0 md:block">
            Austie
          </h1>
          <Me />
          <p className="text-sm text-fg-secondary-color">
            <NextLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY-NC-SA 4.0
            </NextLink>{' '}
            PAST-PRESENT © Austie
          </p>
        </article>
      </main>
    </>
  )
}
