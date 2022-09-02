import { ButtonContainer } from './styles'

interface ButtonProps {
  variant?: string
}

export const Button = ({ variant = 'primary' }: ButtonProps) => {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}
