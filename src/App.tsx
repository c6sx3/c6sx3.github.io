import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import Projects from './components/Projects';
import { useActiveSection } from './hooks/useActiveSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function LoadingOverlay({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(0);
  const [fade, setFade] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (count < 100) {
      const delay = count >= 97 ? 250 : 20;
      const timeout = setTimeout(() => setCount(count + 1), delay);
      return () => clearTimeout(timeout);
    } else {
      setFade(true);
      setTimeout(onFinish, 450);
    }
  }, [count, onFinish]);

  return (
    <div ref={overlayRef} className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-900 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
      <span className="text-[7rem] sm:text-[10rem] font-extrabold text-white tracking-widest drop-shadow-lg animate-pulse select-none pointer-events-none">
        {count}
      </span>
    </div>
  );
}

// Ajout de l'animation slide-up dans le style global (index.css ou tailwind.config.js)
// .animate-slide-up { transform: translateY(-100vh); transition: transform 0.7s cubic-bezier(0.77,0,0.175,1); }

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeBox, setActiveBox] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const { handleSectionChange } = useActiveSection(setActiveSection);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ajout de l'animation slide-up et fadeout dans le style global si besoin
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .animate-slide-up {
        transform: translateY(-100vh);
        transition: transform 0.7s cubic-bezier(0.77,0,0.175,1);
      }
      .fadeout-overlay {
        opacity: 0;
        transition: opacity 0.7s cubic-bezier(0.77,0,0.175,1);
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const boxes = [
    { component: <Introduction />, title: "Introduction" },
    { component: <div className="w-full h-full flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-8 mt-4">Experience</h2>
      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-2.5 h-2.5 rounded-full bg-accent mt-2" />
          <div>
            <h3 className="text-lg font-semibold mb-2">2023-2024</h3>
            <p className="text-text-secondary text-base sm:text-base leading-relaxed">
              Started my coding journey, exploring the basics of programming and web development. Built my first projects and learned the fundamentals.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-2.5 h-2.5 rounded-full bg-accent mt-2" />
          <div>
            <h3 className="text-lg font-semibold mb-2">2024-2025</h3>
            <p className="text-text-secondary text-base sm:text-base leading-relaxed">
              Gained solid foundations and started building more complex projects. Getting comfortable with different technologies and frameworks.
            </p>
          </div>
        </div>
      </div>
    </div>, title: "Experience" },
    { component: <Projects />, title: "Projects" }
  ];

  const handlePrev = () => {
    setActiveBox((prev) => (prev === 0 ? boxes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveBox((prev) => (prev === boxes.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTouchStart(null);
    }
  };

  const boxClass = isMobile 
    ? `w-[90vw] max-w-xs min-w-[220px] min-h-[220px] max-h-[70vh] bg-dark-card/50 backdrop-blur-sm border-accent border-[1.5px] rounded-lg px-4 py-5 flex items-center mx-auto my-4 transition-all duration-700 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-dark-card/30` 
    : `w-[400px] h-[500px] bg-dark-card/50 backdrop-blur-sm border-accent border-[1.5px] rounded-lg px-12 py-12 flex items-center transition-all duration-700 ease-in-out`;

  return (
    <div className="flex flex-col h-screen w-screen bg-dark-bg text-text-primary overflow-hidden">
      {loading && <LoadingOverlay onFinish={() => setLoading(false)} />}
      <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
      <main ref={mainRef} className="flex-1 w-full relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="relative w-full max-w-[1800px] h-[600px] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {!isMobile && !loading && (
              <>
                {/* Left Arrow */}
                <button 
                  onClick={handlePrev}
                  className="absolute left-[calc(50%-300px)] top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-dark-card/50 hover:bg-dark-card transition-colors"
                >
                  <ChevronLeft size={32} />
                </button>

                {/* Right Arrow */}
                <button 
                  onClick={handleNext}
                  className="absolute right-[calc(50%-300px)] top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-dark-card/50 hover:bg-dark-card transition-colors"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Boxes */}
            {boxes.map((box, index) => {
              const position = (index - activeBox + boxes.length) % boxes.length;
              const isActive = position === 0;
              const isLeft = position === boxes.length - 1;
              const isRight = position === 1;

              return (
                <div
                  key={index}
                  className={`absolute ${boxClass} ${
                    isActive 
                      ? 'scale-100 opacity-100 z-30' 
                      : isLeft || isRight
                      ? 'scale-90 opacity-50 blur-sm z-20 translate-y-8'
                      : 'scale-75 opacity-0 z-10'
                  } ${
                    isMobile 
                      ? isActive 
                        ? 'translate-y-0' 
                        : isLeft 
                          ? '-translate-y-[400px]' 
                          : 'translate-y-[400px]'
                      : isLeft 
                        ? '-translate-x-[400px]' 
                        : isRight 
                          ? 'translate-x-[400px]' 
                          : 'translate-x-0'
                  }`}
                >
                  {box.component}
                </div>
              );
            })}

            {/* Dots for mobile */}
            {isMobile && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
                {boxes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveBox(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === activeBox 
                        ? 'bg-white scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;