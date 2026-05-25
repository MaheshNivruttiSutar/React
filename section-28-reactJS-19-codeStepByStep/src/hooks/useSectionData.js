import { useState, useEffect } from 'react';

export const useSectionData = (sectionPath) => {
  const [notes, setNotes] = useState('');
  const [example, setExample] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sectionPath) {
      return;
    }

    const loadSection = async () => {
      try {
        setLoading(true);
        
        // Dynamically import the example component
        try {
          const module = await import(`../sections/${sectionPath}/Example.jsx`);
          setExample(() => module.default || module.WhatIsComponentExample);
        } catch (err) {
          console.warn(`Could not load example for ${sectionPath}:`, err);
        }

        // Try to load notes
        try {
          const notesModule = await import(`../sections/${sectionPath}/Notes.md?raw`);
          setNotes(notesModule.default || '');
        } catch (err) {
          console.warn(`Could not load notes for ${sectionPath}:`, err);
        }

        setError(null);
      } catch (err) {
        console.error('Error loading section:', err);
        setError('Failed to load section content');
      } finally {
        setLoading(false);
      }
    };

    loadSection();
  }, [sectionPath]);

  return { notes, example, loading, error };
};

export default useSectionData;
