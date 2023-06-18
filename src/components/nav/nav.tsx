'use client'
// import { useMediaQuery } from '@/hooks/use-media-query'
import { Github, Pen, Rss, Twitter, Youtube } from 'lucide-react'
import { Link } from '../link'
import { FloatingNav } from './floating-nav'
import { SideNav } from './sidenav'

type Link = {
  node: React.ReactNode
  href: string
  ariaLabel?: string
}

export const NAV_LINKS: Link[] = [
  { node: <Pen/>, href: '/writing' },
]

export const SOCIAL_LINKS: Link[] = [
  {
    node: <Github />,
    href: 'https://github.com/austiecodes',
    ariaLabel: 'GitHub repo for this site',
  },
  {
    node: <Rss />,
    href: '/feed.xml',
    ariaLabel: 'RSS',
  },
]

export function Nav() {
  return (
    <>
      <SideNav />
      <FloatingNav />
    </>
  )
}
