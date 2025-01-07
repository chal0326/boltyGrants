import React from 'react';
import { Container, Title } from '@mantine/core';

function FeedbackDisplay({ feedback }) {
  return (
    <Container>
      <Title order={3}>AI Feedback</Title>
      <p>{feedback}</p>
    </Container>
  );
}

export default FeedbackDisplay;
