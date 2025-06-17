import styled from 'styled-components';
import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  onClick?: () => void;
  actions?: ReactNode;  // <- nova prop para ações customizadas
}

const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-3px);
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text};
`;

const CardDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  opacity: 0.85;
`;

const CardIcon = styled.div`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.primary};
`;

export const Card = ({ title, description, icon, onClick, actions }: CardProps) => {
  return (
    <CardWrapper onClick={onClick}>
      {icon && <CardIcon>{icon}</CardIcon>}
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
      {actions && <div style={{ marginTop: '0.75rem' }}>{actions}</div>}
    </CardWrapper>
  );
};
