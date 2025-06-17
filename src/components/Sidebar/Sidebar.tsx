// components/Sidebar/Sidebar.tsx

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SidebarContainer = styled.aside`
  width: 200px;
  background-color: ${({ theme }) => theme.background};
  border-right: 1px solid ${({ theme }) => theme.primary};
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const NavItem = styled(NavLink)`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;

  &.active {
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
  }
`;

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <NavItem to="/tarefas">Tarefas</NavItem>
      <NavItem to="/metas">Metas</NavItem>
      <NavItem to="/habitos">Hábitos</NavItem>
      <NavItem to="/lembretes">Lembretes</NavItem>
    </SidebarContainer>
  );
};
