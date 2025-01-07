import React, { useState } from 'react';
import { Container, Title } from '@mantine/core';
import GrantEditor from './GrantEditor';
import GrantList from './GrantList';

function Dashboard() {
  const [selectedDraft, setSelectedDraft] = useState(null);

  const handleDraftSelect = (draft) => {
    setSelectedDraft(draft);
  };

  const handleDraftSaved = () => {
    setSelectedDraft(null); // Clear selection after saving
  };

  return (
    <Container>
      <Title order={2}>Welcome to Your Dashboard</Title>
      <GrantEditor selectedDraft={selectedDraft} onDraftSaved={handleDraftSaved} />
      <GrantList onDraftSelect={handleDraftSelect} />
    </Container>
  );
}

export default Dashboard;
