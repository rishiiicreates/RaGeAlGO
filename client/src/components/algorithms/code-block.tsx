import { useEffect, useRef } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const codeRef = useRef<HTMLPreElement>(null);
  
  useEffect(() => {
    // Load Prism.js for syntax highlighting
    const loadPrism = async () => {
      // We're using a CDN to load Prism instead of including it as a dependency
      if (!(window as any).Prism) {
        const prismScript = document.createElement('script');
        prismScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js';
        prismScript.async = true;
        
        const prismCss = document.createElement('link');
        prismCss.rel = 'stylesheet';
        prismCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-okaidia.min.css';
        
        document.head.appendChild(prismCss);
        document.body.appendChild(prismScript);
        
        prismScript.onload = () => {
          if (codeRef.current && (window as any).Prism) {
            (window as any).Prism.highlightElement(codeRef.current);
          }
        };
      } else if (codeRef.current) {
        // Prism is already loaded, just highlight
        (window as any).Prism.highlightElement(codeRef.current);
      }
    };
    
    loadPrism();
  }, [code]);
  
  return (
    <pre 
      ref={codeRef}
      className={`language-${language} font-code text-retro-green text-sm overflow-x-auto`}
    >
      <code>{code}</code>
    </pre>
  );
}
