import React, { useState, useEffect } from 'react';
import { TextInput, PasswordInput, Button, Container, Title } from '@mantine/core';
import { supabase } from '../supabaseClient';

function UserProfile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = supabase.auth.user();
      if (user) {
        setEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  const handleUpdateEmail = async () => {
    const user = supabase.auth.user();
    const { error } = await supabase.auth.update({ email });
    if (error) setError(error.message);
    else {
      setError(null);
      setSuccess('Email updated successfully!');
    }
  };

  const handleUpdatePassword = async () => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const { error } = await supabase.auth.update({ password });
    if (error) setError(error.message);
    else {
      setError(null);
      setSuccess('Password updated successfully!');
      setPassword(''); // Clear password field after successful update
    }
  };

  return (
    <Container>
      <Title order={2}>User Profile</Title>
      <TextInput
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <Button onClick={handleUpdateEmail}>Update Email</Button>
      <PasswordInput
        label="New Password"
        placeholder="Enter your new password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      <Button onClick={handleUpdatePassword}>Update Password</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </Container>
  );
}

export default UserProfile;
