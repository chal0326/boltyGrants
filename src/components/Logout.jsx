import React from 'react';
import { Button } from '@mantine/core';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}

export default Logout;
