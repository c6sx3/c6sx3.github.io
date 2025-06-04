import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
}

const GITHUB_USERNAME = 'c6sx3';

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`)
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <div className="sticky top-0 bg-dark-card/70 pb-2 z-20">
        <h2 className="text-2xl font-bold mb-2">Projects</h2>
      </div>
      <div className="space-y-4 pr-2">
        {loading && <div className="text-text-secondary">Loading...</div>}
        {!loading && repos.length === 0 && <div className="text-text-secondary">No public projects found.</div>}
        {repos.map((repo) => (
          <div key={repo.id} className="bg-dark-bg/50 border border-accent rounded-lg p-4">
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-accent mt-2 mr-3" />
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline text-accent">
                    {repo.name}
                  </a>
                </h3>
                <p className="text-text-secondary text-sm mb-2">{repo.description || 'No description.'}</p>
                {repo.language && (
                  <span className="px-2 py-0.5 bg-dark-card text-text-secondary text-xs rounded-md">
                    {repo.language}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;