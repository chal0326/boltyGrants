import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Container, Title } from '@mantine/core';
import { supabase } from '../supabaseClient';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setError(null);
  };

  return (
    <Container>
      <Title order={2}>Register</Title>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      <Button onClick={handleRegister} loading={loading}>Register</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Container>
  );
}

export default Register;
