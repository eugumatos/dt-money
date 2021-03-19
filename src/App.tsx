import React, { useState } from 'react';
import Modal from 'react-modal';

import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewTransactionModal } from './components/NewTransactionModal';

import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');

export function App() {
  const [isNewTrasactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactonModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactonModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactonModal}/>
        <Dashboard />
        <NewTransactionModal 
          isOpen={isNewTrasactionModalOpen} 
          onRequestClose={handleCloseNewTransactonModal} 
        />
      <GlobalStyle />
    </>
  );
}

