import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

interface NavLinkProps extends LinkProps {
  href: string
  title: string
  children: ReactNode
}

export const NavLink = ({ href, title, children, ...rest }: NavLinkProps) => {
  const router = useRouter()
  return (
    <Link href={href} {...rest} passHref>
      <a title={title} className={router.asPath === href ? 'active' : ''}>
        {children}
      </a>
    </Link>
  )
}
