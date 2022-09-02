import styled from 'styled-components'

interface ButtonContainerProps {
  variant: string
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem;
  color: white;
  background-color: ${({ theme }) => theme['gray-500']};
`
