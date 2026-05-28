import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollAnimation(containerRef: React.RefObject<HTMLElement | null>, selectors: string[]) {
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Check if mobile (width <= 768px)
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        selectors.forEach((selector) => {
          const elements = gsap.utils.toArray(selector);
          elements.forEach((el) => {
            gsap.set(el as gsap.DOMTarget, { opacity: 1, y: 0, scale: 1 });
          });
        });
        return;
      }

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.globalTimeline.timeScale(0);
      }

      selectors.forEach((selector) => {
        const elements = gsap.utils.toArray(selector);
        if (elements.length > 0) {
          gsap.fromTo(
            elements as gsap.DOMTarget,
            { opacity: 0, y: 40, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.2,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
              },
            }
          );
        }
      });
      
      // Refresh ScrollTrigger on resize or load
      ScrollTrigger.refresh();

    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, selectors]);
}
