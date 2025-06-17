import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiCheckCircle } from 'react-icons/fi';
import { Card } from '../components/Card/Card';
import { Button } from '../components/Button/Button';

interface Habito {
  id: number;
  nome: string;
  frequencia: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  input,
  select {
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;

export default function Habitos() {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [nome, setNome] = useState('');
  const [frequencia, setFrequencia] = useState('Diário');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    const salvos = localStorage.getItem('habitos');
    if (salvos) setHabitos(JSON.parse(salvos));
  }, []);

  useEffect(() => {
    localStorage.setItem('habitos', JSON.stringify(habitos));
  }, [habitos]);

  const resetarFormulario = () => {
    setNome('');
    setFrequencia('Diário');
    setEditandoId(null);
  };

  const salvarHabito = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;

    if (editandoId !== null) {
      setHabitos((prev) =>
        prev.map((h) => (h.id === editandoId ? { ...h, nome, frequencia } : h))
      );
    } else {
      const novo: Habito = {
        id: Date.now(),
        nome,
        frequencia,
      };
      setHabitos([novo, ...habitos]);
    }

    resetarFormulario();
  };

  const iniciarEdicao = (habito: Habito) => {
    setEditandoId(habito.id);
    setNome(habito.nome);
    setFrequencia(habito.frequencia);
  };

  const excluirHabito = (id: number) => {
    if (confirm('Excluir hábito?')) {
      setHabitos((prev) => prev.filter((h) => h.id !== id));
    }
  };

  return (
    <div>
      <h2>Hábitos</h2>

      <Form onSubmit={salvarHabito}>
        <input
          type="text"
          placeholder="Nome do hábito"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <select value={frequencia} onChange={(e) => setFrequencia(e.target.value)}>
          <option value="Diário">Diário</option>
          <option value="Semanal">Semanal</option>
          <option value="Mensal">Mensal</option>
        </select>
        <Button label={editandoId ? 'Salvar Edição' : 'Adicionar Hábito'} />
        {editandoId && (
          <Button label="Cancelar" onClick={resetarFormulario} variant="secondary" />
        )}
      </Form>

      {habitos.map((habito) => (
        <Card
          key={habito.id}
          title={habito.nome}
          description={`Frequência: ${habito.frequencia}`}
          icon={<FiCheckCircle />}
          actions={
            <>
              <Button
                label="Editar"
                onClick={() => iniciarEdicao(habito)}
                variant="secondary"
              />
              <Button
                label="Excluir"
                onClick={() => excluirHabito(habito.id)}
                variant="secondary"
              />
            </>
          }
        />
      ))}
    </div>
  );
}
