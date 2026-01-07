import React, { useEffect } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const instagramPosts = [
  {
    id: "post1",
    url: "https://www.instagram.com/p/DPmcXxlkWVZ/?hl=en&img_index=1",
  },
  {
    id: "post2", 
    url: "https://www.instagram.com/p/DPFE6ZHjzJS/?hl=en",
  },
  {
    id: "post3",
    url: "https://www.instagram.com/p/DOgF11jEWaF/?hl=en",
  },
  {
    id: "post4",
    url: "https://www.instagram.com/p/DOOyNhlDyDh/?hl=en",
  },
  {
    id: "post5",
    url: "https://www.instagram.com/p/DOCfQmBDJLr/?hl=en",
  },
  {
    id: "post6",
    url: "https://www.instagram.com/p/DN3dWrLYnLJ/?hl=en",
  },
];

export const InstagramFeed: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasProcessed, setHasProcessed] = React.useState(false);
  const [hasRendered, setHasRendered] = React.useState(false);
  const processingRef = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we're returning to a page with already-processed embeds
    if (containerRef.current) {
      const existingIframes = containerRef.current.querySelectorAll('iframe[src*="instagram.com"]');
      if (existingIframes.length > 0) {
        // Embeds already rendered, don't re-process
        setIsLoading(false);
        setHasProcessed(true);
        setHasRendered(true);
        return;
      }
    }

    // Only load the script once
    if (window.instgrm) {
      // Script already loaded
      setIsLoading(false);
      if (!hasProcessed && !processingRef.current && !hasRendered) {
        processingRef.current = true;
        setTimeout(() => {
          window.instgrm!.Embeds.process();
          setHasProcessed(true);
          setHasRendered(true);
        }, 100);
      }
      return;
    }

    // Load Instagram's embed script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
      if (window.instgrm && !hasProcessed && !processingRef.current && !hasRendered) {
        processingRef.current = true;
        setTimeout(() => {
          window.instgrm!.Embeds.process();
          setHasProcessed(true);
          setHasRendered(true);
        }, 100);
      }
    };
    document.body.appendChild(script);

    // Don't remove the script on unmount - keep it loaded
    return () => {
      // Intentionally empty - script stays in DOM
    };
  }, []); // Empty dependency array - only run once

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <a 
          href="https://www.instagram.com/17southantiques/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Icon icon="lucide:instagram" className="text-2xl text-primary" />
          <span className="font-medium text-neutral-800">@17southantiques</span>
        </a>
        <p className="text-neutral-700 font-light">
          Stay updated with our latest acquisitions and behind-the-scenes moments.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-neutral-100 rounded-lg h-96 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instagramPosts.map((post) => (
            <div key={post.id} className="instagram-embed-container">
              <blockquote 
                className="instagram-media" 
                data-instgrm-captioned 
                data-instgrm-permalink={post.url}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: '0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  margin: '0',
                  maxWidth: '100%',
                  minWidth: '326px',
                  padding: '0',
                  width: '100%'
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      background: '#FFFFFF',
                      lineHeight: 0,
                      padding: '0 0',
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%'
                    }}
                  >
                    View this post on Instagram
                  </a>
                </div>
              </blockquote>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Button 
          as="a"
          href="https://www.instagram.com/17southantiques/?hl=en" 
          target="_blank"
          rel="noopener noreferrer"
          color="primary" 
          variant="flat" 
          startContent={<Icon icon="lucide:instagram" />}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Follow Us on Instagram
        </Button>
      </div>
    </div>
  );
};

// TypeScript declaration for Instagram embed
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}