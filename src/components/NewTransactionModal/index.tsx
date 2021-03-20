import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { useTransactions } from '../../hooks/useTransactions';

import { Container, TransactionTypeContainer, RadioBox  } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  
  const [input, setInput] = useState({title: '', amount: 0, category: '', type: 'deposit'});
  
  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title: input.title,
      amount: input.amount, 
      category: input.category, 
      type: input.type
    });

    setInput({title: '', amount: 0, category: '', type: 'deposit'});

    onRequestClose();
  } 

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input 
          placeholder="Titulo"
          value={input.title}
          onChange={event => setInput({...input, title: event.target.value})}
        />

        <input 
          type="number" 
          placeholder="Valor"
          value={input.amount}
          onChange={event => setInput({...input, amount: Number(event.target.value)})}
        />

        <TransactionTypeContainer>
          <RadioBox 
            type="button" 
            onClick={() => { setInput({...input, type: 'deposit'}) }}
            isActive={input.type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
            type="button"
            onClick={() => { setInput({...input, type: 'withdraw'}) }}
            isActive={input.type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída"/>
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria"
          value={input.category}
          onChange={event => setInput({...input, category: event.target.value})}
        />
 
        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal> 
  );
}

