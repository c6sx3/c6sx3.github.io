import { useCallback, useEffect } from 'react';

export const useActiveSection = (
  setActiveSection: React.Dispatch<React.SetStateAction<string>>
) => {
  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
    
    // Update URL hash without scrolling
    window.history.pushState(null, '', `#${section}`);
  }, [setActiveSection]);

  // Handle initial load and browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
      } else {
        setActiveSection('home');
      }
    };

    // Set initial section based on hash if present
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [setActiveSection]);

  return { handleSectionChange };
};