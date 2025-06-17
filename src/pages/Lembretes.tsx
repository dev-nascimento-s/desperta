import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiCheckCircle } from 'react-icons/fi';
import { Card } from '../components/Card/Card';
import { Button } from '../components/Button/Button';

interface Lembrete {
  id: number;
  mensagem: string;
  horario: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  input {
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;

const PageContainer = styled.main`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export default function Lembretes() {
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [horario, setHorario] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    const salvos = localStorage.getItem('lembretes');
    if (salvos) setLembretes(JSON.parse(salvos));
  }, []);

  useEffect(() => {
    localStorage.setItem('lembretes', JSON.stringify(lembretes));
  }, [lembretes]);

  const resetarFormulario = () => {
    setMensagem('');
    setHorario('');
    setEditandoId(null);
  };

  const salvarLembrete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    if (editandoId !== null) {
      setLembretes((prev) =>
        prev.map((l) =>
          l.id === editandoId ? { ...l, mensagem, horario } : l
        )
      );
    } else {
      const novo: Lembrete = {
        id: Date.now(),
        mensagem,
        horario,
      };
      setLembretes([novo, ...lembretes]);
    }

    resetarFormulario();
  };

  const iniciarEdicao = (l: Lembrete) => {
    setEditandoId(l.id);
    setMensagem(l.mensagem);
    setHorario(l.horario);
  };

  const excluirLembrete = (id: number) => {
    if (confirm('Excluir lembrete?')) {
      setLembretes((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <div>
      <h2>Lembretes</h2>

      <Form onSubmit={salvarLembrete}>
        <input
          type="text"
          placeholder="Mensagem do lembrete"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />
        <input
          type="datetime-local"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        />
        <Button label={editandoId ? 'Salvar Edição' : 'Adicionar Lembrete'} />
        {editandoId && (
          <Button label="Cancelar" onClick={resetarFormulario} variant="secondary" />
        )}
      </Form>

      <PageContainer>
        {lembretes.map((l) => (
          <Card
            key={l.id}
            title={l.mensagem}
            description={`Horário: ${l.horario}`}
            icon={<FiCheckCircle />}
            actions={
              <>
                <Button label="Editar" onClick={() => iniciarEdicao(l)} variant="secondary" />
                <Button label="Excluir" onClick={() => excluirLembrete(l.id)} variant="secondary" />
              </>
            }
          />
        ))}
      </PageContainer>
    </div>
  );
}
