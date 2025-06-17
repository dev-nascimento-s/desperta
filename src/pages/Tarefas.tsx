
import { Card } from '../components/Card/Card';
import { FiCheckCircle, FiBook, FiTarget } from 'react-icons/fi';
import styled from 'styled-components';

const PageContainer = styled.main`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

// Lista de tarefas simulada
const tarefas = [
  {
    id: 1,
    title: 'Ler 10 páginas',
    description: 'Hábito diário de leitura',
    icon: <FiBook />,
  },
  {
    id: 2,
    title: 'Estudar React',
    description: 'Completar o módulo de hooks',
    icon: <FiCheckCircle />,
  },
  {
    id: 3,
    title: 'Planejar metas da semana',
    description: 'Definir prioridades no Notion',
    icon: <FiTarget />,
  },
];

export default function Tarefas() {
  return (
    <PageContainer>
      {tarefas.map((tarefa) => (
        <Card
          key={tarefa.id}
          title={tarefa.title}
          description={tarefa.description}
          icon={tarefa.icon}
        />
      ))}
    </PageContainer>
  );
}
