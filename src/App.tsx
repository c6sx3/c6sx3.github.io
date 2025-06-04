import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import Projects from './components/Projects';
import { useActiveSection } from './hooks/useActiveSection';

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [layout, setLayout] = useState<'mobile' | 'tablet-col' | 'tablet-row' | 'desktop'>(
    window.innerWidth < 768
      ? 'mobile'
      : window.innerHeight <= 700
      ? 'tablet-row'
      : window.innerWidth < 1100 && window.innerHeight > 700
      ? 'tablet-col'
      : window.innerWidth < 1100
      ? 'tablet-row'
      : 'desktop'
  );
  const [forceScroll, setForceScroll] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const { handleSectionChange } = useActiveSection(setActiveSection);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setLayout('mobile');
      else if (window.innerHeight <= 700) setLayout('tablet-row');
      else if (window.innerWidth < 1100 && window.innerHeight > 700) setLayout('tablet-col');
      else if (window.innerWidth < 1100) setLayout('tablet-row');
      else setLayout('desktop');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect if any box is cut off and force scroll
  useEffect(() => {
    if (!mainRef.current) return;
    const el = mainRef.current;
    setTimeout(() => {
      if (el.scrollHeight > el.clientHeight + 10) setForceScroll(true);
      else setForceScroll(false);
    }, 100); // wait for render
  }, [layout, activeSection]);

  // Margin system for all boxes
  const boxMargin = 'my-3 mx-2 md:my-4 md:mx-4'; // vertical and horizontal margin, responsive
  // Always set a dark border color
  const borderColor = 'border-accent border-[1.5px]';
  // Restrict transitions to transform and colors only
  const transition = 'transition-transform transition-colors duration-700 ease-in-out';

  // Uniform size for row layout, more height and overflow
  const rowBoxClass =
    `flex-1 max-w-[370px] min-w-[220px] min-h-[370px] h-[370px] bg-dark-card/50 backdrop-blur-sm ${borderColor} rounded-lg p-8 flex items-center ${transition} rotate-0 z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-dark-bg ${boxMargin}`;
  const colBoxClass =
    `w-full max-w-md min-h-[220px] bg-dark-card/50 backdrop-blur-sm ${borderColor} rounded-lg p-8 flex items-center ${transition} rotate-0 z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-dark-bg ${boxMargin}`;

  return (
    <div className={`flex flex-col h-screen w-screen bg-dark-bg text-text-primary overflow-hidden ${layout === 'mobile' || forceScroll ? 'overflow-y-auto' : ''}`}>
      <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
      <main ref={mainRef} className="flex-1 w-full relative">
        {layout === 'tablet-col' ? (
          <div className="flex flex-col items-center justify-center h-full gap-6 pt-8 pb-24 px-8">
            <div className={colBoxClass + ' z-20'}>
              <Introduction />
            </div>
            <div className={colBoxClass + ' z-30 shadow-2xl'} style={{boxShadow: '0 8px 32px rgba(0,0,0,0.25)'}}>
              <div>
                <h2 className="text-3xl font-bold mb-6">About Me</h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Self-taught dev, buildin' real shit from scratch. Don't follow no tutorials, I fix my shit & get better. Focus on clean projects that make bank.
                </p>
              </div>
            </div>
            <div className={colBoxClass}>
              <Projects />
            </div>
          </div>
        ) : layout === 'tablet-row' ? (
          <div className="flex flex-row items-center justify-center h-full gap-6 pt-8 pb-24 px-8">
            <div className={rowBoxClass + ' z-20'}>
              <Introduction />
            </div>
            <div className={rowBoxClass + ' z-30 shadow-2xl'} style={{boxShadow: '0 8px 32px rgba(0,0,0,0.25)'}}>
              <div>
                <h2 className="text-3xl font-bold mb-6">About Me</h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Self-taught dev, buildin' real shit from scratch. Don't follow no tutorials, I fix my shit & get better. Focus on clean projects that make bank.
                </p>
              </div>
            </div>
            <div className={rowBoxClass}>
              <Projects />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-start justify-center pt-8 pb-24 px-8 md:px-16 lg:px-24">
            <div className="relative w-full max-w-7xl min-h-[600px] transition-transform transition-colors duration-500" style={{minHeight: '600px'}}>
              {/* Introduction Section */}
              <div className={`absolute ${layout === 'mobile' ? 'left-0 top-0 w-full' : 'left-[5%] top-0 w-[35%]'} min-h-[220px] max-h-[420px] bg-dark-card/50 backdrop-blur-sm ${borderColor} rounded-lg p-8 transform ${transition} ${layout === 'mobile' ? 'rotate-0' : '-rotate-2 hover:rotate-0'} flex items-center z-20 overflow-y-auto ${boxMargin}`}>
                <Introduction />
              </div>
              {/* About Section */}
              <div className={`absolute ${layout === 'mobile' ? 'left-0 top-[360px] w-full' : 'left-[25%] top-[285px] w-[35%]'} min-h-[285px] max-h-[420px] bg-dark-card/50 backdrop-blur-sm ${borderColor} rounded-lg p-8 transform ${transition} ${layout === 'mobile' ? 'rotate-0' : 'rotate-2 hover:rotate-0'} flex items-center z-30 shadow-2xl overflow-y-auto ${boxMargin}`} style={{boxShadow: '0 8px 32px rgba(0,0,0,0.25)'}}>
                <div>
                  <h2 className="text-3xl font-bold mb-6">About Me</h2>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Self-taught dev, buildin' real shit from scratch. Don't follow no tutorials, I fix my shit & get better. Focus on clean projects that make bank.
                  </p>
                </div>
              </div>
              {/* Projects Section */}
              <div className={`absolute ${layout === 'mobile' ? 'left-0 top-[640px] w-full' : 'right-[5%] top-[20px] w-[38%]'} min-h-[220px] max-h-[420px] bg-dark-card/50 backdrop-blur-sm ${borderColor} rounded-lg p-8 transform ${transition} ${layout === 'mobile' ? 'rotate-0' : '-rotate-3 hover:rotate-0'} flex items-center z-10 overflow-y-auto ${boxMargin}`} style={{scrollbarColor:'#3a3a3a #0f0f0f', scrollbarWidth:'thin'}}>
                <Projects />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;