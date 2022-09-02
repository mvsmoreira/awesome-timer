import { ReactNode } from 'react'
import { Header } from '../../components/Header'
import { LayoutContainer } from './styles'

interface DefaultLayoutProps {
  children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      {children}
    </LayoutContainer>
  )
}
