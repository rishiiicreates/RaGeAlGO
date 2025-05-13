import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-retro-black py-8 border-t-4 border-retro-purple">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <div className="w-10 h-10 bg-retro-cyan mr-3 pixel-border flex items-center justify-center">
                <span className="text-xl font-bold">[A]</span>
              </div>
              <h2 className="text-lg text-retro-white">Algo<span className="text-retro-cyan">Quest</span></h2>
            </div>
            <p className="font-code text-sm mt-2 text-center md:text-left">Master algorithms with retro vibes!</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm mb-3 text-retro-cyan">CATEGORIES</h3>
              <ul className="font-code text-sm space-y-2">
                <li><Link href="/categories/1"><div className="hover:text-retro-teal cursor-pointer">Sorting</div></Link></li>
                <li><Link href="/categories/2"><div className="hover:text-retro-teal cursor-pointer">Searching</div></Link></li>
                <li><Link href="/categories/3"><div className="hover:text-retro-teal cursor-pointer">Graphs</div></Link></li>
                <li><Link href="/categories/4"><div className="hover:text-retro-teal cursor-pointer">Dynamic Programming</div></Link></li>
                <li><Link href="/categories/5"><div className="hover:text-retro-teal cursor-pointer">Data Structures</div></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm mb-3 text-retro-cyan">RESOURCES</h3>
              <ul className="font-code text-sm space-y-2">
                <li><Link href="/cheatsheets"><div className="hover:text-retro-teal cursor-pointer">Cheat Sheets</div></Link></li>
                <li><Link href="/advanced"><div className="hover:text-retro-teal cursor-pointer">Advanced Algorithms</div></Link></li>
                <li><div className="hover:text-retro-teal cursor-pointer">Competitions</div></li>
                <li><div className="hover:text-retro-teal cursor-pointer">Video Tutorials</div></li>
                <li><div className="hover:text-retro-teal cursor-pointer">FAQ</div></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm mb-3 text-retro-cyan">MY ACCOUNT</h3>
              <ul className="font-code text-sm space-y-2">
                <li><Link href="/profile"><div className="hover:text-retro-teal cursor-pointer">Progress Dashboard</div></Link></li>
                <li><div className="hover:text-retro-teal cursor-pointer">Achievements</div></li>
                <li><div className="hover:text-retro-teal cursor-pointer">Saved Algorithms</div></li>
                <li><div className="hover:text-retro-teal cursor-pointer">Settings</div></li>
                <li><div className="hover:text-retro-teal cursor-pointer">Logout</div></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm mb-3 text-retro-cyan">CONNECT</h3>
              <ul className="font-code text-sm space-y-2">
                <li><div className="hover:text-retro-teal cursor-pointer">Discord Community</div></li>
                <li><div className="hover:text-retro-teal cursor-pointer">GitHub</div></li>
                <li><div className="hover:text-retro-teal cursor-pointer">Twitter/X</div></li>
                <li><div className="hover:text-retro-teal cursor-pointer">YouTube</div></li>
                <li><div className="hover:text-retro-teal cursor-pointer">Contact Us</div></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-retro-gray">
          <div className="inline-block bg-retro-black border-2 border-retro-purple px-4 py-2 text-xs font-code">
            <span className="text-retro-pink">HIGHSCORE:</span> <span className="text-retro-yellow">9999</span>
          </div>
          <div className="inline-block bg-retro-black border-2 border-retro-cyan px-4 py-2 text-xs font-code">
            <span className="text-retro-teal">LEVEL:</span> <span className="text-retro-yellow">42</span>
          </div>
          <div className="inline-block bg-retro-black border-2 border-retro-green px-4 py-2 text-xs font-code">
            <span className="text-retro-green">ALGORITHMS MASTERED:</span> <span className="text-retro-yellow">15/50</span>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="font-code text-xs">© 2025 AlgoQuest. All rights reserved. <span className="text-retro-cyan animate-blink">PRESS START TO CONTINUE LEARNING</span></p>
        </div>
      </div>
    </footer>
  );
}
