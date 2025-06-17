import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiTarget } from 'react-icons/fi';
import { Card } from '../components/Card/Card';
import { Button } from '../components/Button/Button';

interface Meta {
  id: number;
  titulo: string;
  descricao: string;
  prazo: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  input,
  textarea {
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

export default function Metas() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    const salvas = localStorage.getItem('metas');
    if (salvas) setMetas(JSON.parse(salvas));
  }, []);

  useEffect(() => {
    localStorage.setItem('metas', JSON.stringify(metas));
  }, [metas]);

  const resetarFormulario = () => {
    setTitulo('');
    setDescricao('');
    setPrazo('');
    setEditandoId(null);
  };

  const salvarMeta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    if (editandoId !== null) {
      setMetas((prev) =>
        prev.map((m) =>
          m.id === editandoId ? { ...m, titulo, descricao, prazo } : m
        )
      );
    } else {
      const nova: Meta = {
        id: Date.now(),
        titulo,
        descricao,
        prazo,
      };
      setMetas([nova, ...metas]);
    }

    resetarFormulario();
  };

  const iniciarEdicao = (meta: Meta) => {
    setEditandoId(meta.id);
    setTitulo(meta.titulo);
    setDescricao(meta.descricao);
    setPrazo(meta.prazo);
  };

  const excluirMeta = (id: number) => {
    if (confirm('Excluir meta?')) {
      setMetas((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div>
      <h2>Minhas Metas</h2>

      <Form onSubmit={salvarMeta}>
        <input
          type="text"
          placeholder="Título da meta"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
        />
        <Button label={editandoId ? 'Salvar Edição' : 'Adicionar Meta'} />
        {editandoId && (
          <Button label="Cancelar" onClick={resetarFormulario} variant="secondary" />
        )}
      </Form>

      <PageContainer>
        {metas.map((meta) => (
          <Card
            key={meta.id}
            title={meta.titulo}
            description={`Prazo: ${meta.prazo}\n${meta.descricao}`}
            icon={<FiTarget />}
            actions={
              <>
                <Button label="Editar" onClick={() => iniciarEdicao(meta)} variant="secondary" />
                <Button label="Excluir" onClick={() => excluirMeta(meta.id)} variant="secondary" />
              </>
            }
          />
        ))}
      </PageContainer>
    </div>
  );
}
