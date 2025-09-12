import { useEffect, useRef, useState } from 'react';
import { X, Home, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import eventImage1 from '@/assets/event-gallery-1.jpg';

const EventsGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const { scrollToTop: smoothScrollToTop } = useSmoothScroll();

  const galleryImages = [
    {
      src: eventImage1,
      alt: "AI/ML Workshop Session",
      title: "Deep Learning Workshop 2024"
    },
    {
      src: eventImage1, // Reusing for demo - in real app would have different images
      alt: "Computer Vision Project Demo",
      title: "Computer Vision Hackathon"
    },
    {
      src: eventImage1,
      alt: "Team Collaboration Session",
      title: "AI Ethics Symposium"
    },
    {
      src: eventImage1,
      alt: "Guest Speaker Presentation",
      title: "Industry Expert Talk"
    },
    {
      src: eventImage1,
      alt: "Student Project Showcase",
      title: "Project Exhibition Day"
    },
    {
      src: eventImage1,
      alt: "Coding Competition",
      title: "Neural Network Challenge"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  };

  const handleScrollToTop = () => {
    smoothScrollToTop();
  };

  const openMorePics = () => {
    window.open('https://photos.google.com/share/your-gallery-link', '_blank');
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    if (lightboxImage) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [lightboxImage]);

  return (
    <>
      <section id="gallery" ref={sectionRef} className="py-20 px-4 relative animated-bg">
        {/* Floating Particles Background */}
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Neural Network Background */}
        <div className="neural-network">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="neural-node"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <div
              key={`connection-${i}`}
              className="neural-connection"
              style={{
                left: `${15 + (i * 15)}%`,
                top: `${30 + Math.random() * 40}%`,
                width: `${100 + Math.random() * 200}px`,
                animationDelay: `${i * 1}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-orbitron font-bold neon-text mb-6">
              Events Gallery
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-electric-red to-neon-green mx-auto mb-8" />
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Capturing moments from our incredible AI/ML journey
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className={`fade-in-up ${isVisible ? 'animate' : ''} cursor-pointer group`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openLightbox(image.src)}
              >
                <div className="relative overflow-hidden rounded-xl glass-card-subtle hover:shadow-lg transition-all duration-500 glow-red-hover">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-space/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-orbitron font-semibold text-sm">
                        {image.title}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-cyber-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-cyber-blue rounded animate-spin" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.8s' }}>
            <Button
              onClick={openMorePics}
              className="glass-button text-white font-orbitron font-semibold text-lg px-8 py-4 rounded-xl glow-hover transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
            >
              <ExternalLink className="w-5 h-5" />
              View More Pictures
            </Button>
            <Button
              onClick={handleScrollToTop}
              variant="outline"
              className="glass-button border-cyber-blue/30 text-cyber-blue hover:text-white font-orbitron font-semibold text-lg px-8 py-4 rounded-xl glow-hover transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-deep-space/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-cyber-blue transition-colors duration-200 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={lightboxImage} 
              alt="Gallery Image" 
              className="max-w-full max-h-[80vh] object-contain rounded-xl cyber-border animate-zoom-in"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EventsGallery;