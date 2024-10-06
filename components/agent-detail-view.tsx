'use client';

import React from 'react';
import { Agent } from '@/types';

interface AgentDetailViewProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

const AgentDetailView: React.FC<AgentDetailViewProps> = ({ agent, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{agent.name}</h2>
        <p>{agent.expertise}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AgentDetailView;