import Image from 'next/image'
import { Scroll, Timer } from 'phosphor-react'
import { FC } from 'react'
import { NavLink } from './NavLink'
import { HeaderContainer } from './styles'

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <Image src="/logo.svg" alt="" width={40} height={40} />
      <nav>
        <NavLink href="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink href="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
