import styled from 'styled-components';

// Props recebidas pelo componente React
interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

// Props usadas apenas dentro do styled-component
interface StyledButtonProps {
  $variant?: 'primary' | 'secondary';
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme, $variant }) =>
    $variant === 'secondary' ? 'transparent' : theme.primary};
  color: ${({ theme, $variant }) =>
    $variant === 'secondary' ? theme.text : '#fff'};
  border: ${({ theme, $variant }) =>
    $variant === 'secondary' ? `2px solid ${theme.primary}` : 'none'};
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

// Componente principal que renderiza o botão estilizado
export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} $variant={variant}>
      {label}
    </StyledButton>
  );
};
