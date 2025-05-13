import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { PixelButton } from "@/components/ui/pixel-button";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-retro-black p-4 border-b-4 border-retro-red sticky top-0 z-40">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto justify-between">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="w-10 h-10 bg-retro-red mr-3 pixel-border flex items-center justify-center">
                <span className="text-xl font-bold">[A]</span>
              </div>
              <h1 className="text-lg md:text-xl text-retro-white">Algo<span className="text-retro-yellow">Quest</span></h1>
            </div>
          </Link>
          
          <button
            className="md:hidden text-retro-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className={`flex flex-col md:flex-row items-center gap-2 md:gap-4 ${isMenuOpen ? 'block' : 'hidden md:flex'}`}>
          <Link href="/">
            <div className={`pixel-button ${location === '/' ? 'bg-retro-red' : 'bg-retro-navy'} border-2 border-retro-white shadow-pixel text-sm px-3 py-2 cursor-pointer`}>
              Home
            </div>
          </Link>
          <Link href="/#algorithms">
            <div className={`pixel-button bg-retro-navy border-2 border-retro-white shadow-pixel text-sm px-3 py-2 cursor-pointer`}>
              Algorithms
            </div>
          </Link>
          <Link href="/#levels">
            <div className={`pixel-button bg-retro-navy border-2 border-retro-white shadow-pixel text-sm px-3 py-2 cursor-pointer`}>
              Levels
            </div>
          </Link>
          <Link href="/cheatsheets">
            <div className={`pixel-button ${location === '/cheatsheets' ? 'bg-retro-red' : 'bg-retro-navy'} border-2 border-retro-white shadow-pixel text-sm px-3 py-2 cursor-pointer`}>
              Cheat Sheets
            </div>
          </Link>
          <Link href="/advanced">
            <div className={`pixel-button ${location === '/advanced' ? 'bg-retro-cyan' : 'bg-retro-blue'} border-2 border-retro-white shadow-pixel text-sm px-3 py-2 cursor-pointer`}>
              Advanced
            </div>
          </Link>
          <Link href="/competitions">
            <div className={`pixel-button ${location === '/competitions' ? 'bg-retro-pink' : 'bg-retro-orange'} border-2 border-retro-white shadow-pixel text-sm px-3 py-2 cursor-pointer`}>
              Competitions
            </div>
          </Link>
          <Link href="/quiz">
            <div className={`pixel-button ${location === '/quiz' ? 'bg-retro-green' : 'bg-retro-cyan'} border-2 border-retro-white shadow-pixel text-sm px-3 py-2 cursor-pointer`}>
              Quiz
            </div>
          </Link>
          <Link href="/visualizer">
            <div className={`pixel-button ${location === '/visualizer' ? 'bg-retro-blue' : 'bg-retro-teal'} border-2 border-retro-white shadow-pixel text-sm px-3 py-2 cursor-pointer`}>
              Visualizer
            </div>
          </Link>
          <Link href="/profile">
            <div className={`pixel-button ${location === '/profile' ? 'bg-retro-red' : 'bg-retro-purple'} border-2 border-retro-white shadow-pixel text-sm px-3 py-2 cursor-pointer`}>
              My Progress
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
