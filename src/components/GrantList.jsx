import React, { useEffect, useState } from 'react';
import { Container, Title, List, Button } from '@mantine/core';
import { supabase } from '../supabaseClient';

function GrantList({ onDraftSelect }) {
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    const fetchGrants = async () => {
      const user = supabase.auth.user();
      const { data } = await supabase
        .from('grant_applications')
        .select('*')
        .eq('user_id', user.id);
      setGrants(data);
    };
    fetchGrants();
  }, []);

  const handleDelete = async (id) => {
    await supabase.from('grant_applications').delete().eq('id', id);
    setGrants(grants.filter(grant => grant.id !== id));
  };

  return (
    <Container>
      <Title order={2}>Your Grant Applications</Title>
      <List>
        {grants.map((grant) => (
          <List.Item key={grant.id}>
            {grant.draft}
            <Button onClick={() => onDraftSelect(grant)}>Edit</Button>
            <Button onClick={() => handleDelete(grant.id)}>Delete</Button>
          </List.Item>
        ))}
      </List>
    </Container>
  );
}

export default GrantList;
