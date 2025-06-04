import React from 'react';
import { Github } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="w-full py-6 px-8 flex items-center justify-between z-10">
      <div className="text-2xl font-bold tracking-tight">c6sx3</div>
      <a
        href="https://github.com/c6sx3"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-2xl font-bold hover:text-accent transition-colors duration-200"
      >
        <Github size={28} />
      </a>
    </header>
  );
};

export default Header;