import React, { useState, useEffect } from 'react';
import { Button, Container, Title } from '@mantine/core';
import { supabase } from '../supabaseClient';
import { getFeedback } from '../utils/openaiClient';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function GrantEditor({ selectedDraft, onDraftSaved }) {
  const [draft, setDraft] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDraft) {
      setDraft(selectedDraft.draft);
    }
  }, [selectedDraft]);

  const handleSubmit = async () => {
    if (!draft.trim()) {
      setError('Draft cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const aiFeedback = await getFeedback(draft);
      setFeedback(aiFeedback);

      const user = supabase.auth.user();
      if (selectedDraft) {
        // Update existing draft
        await supabase
          .from('grant_applications')
          .update({ draft })
          .eq('id', selectedDraft.id);
      } else {
        // Insert new draft
        await supabase
          .from('grant_applications')
          .insert([{ user_id: user.id, draft }]);
      }
      onDraftSaved(); // Notify parent component to refresh drafts
    } catch (err) {
      setError('Failed to save draft or get feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title order={2}>Grant Application Editor</Title>
      <ReactQuill
        value={draft}
        onChange={setDraft}
        placeholder="Write your grant application draft here..."
      />
      <Button onClick={handleSubmit} loading={loading}>
        {selectedDraft ? 'Update Draft' : 'Save Draft'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {feedback && <div><h3>AI Feedback:</h3><p>{feedback}</p></div>}
    </Container>
  );
}

export default GrantEditor;
