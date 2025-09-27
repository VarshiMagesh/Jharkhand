import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Delay until after page mount
    setTimeout(() => {
      // Try main container first
      const main = document.querySelector("main");

      if (main && main.scrollTo) {
        main.scrollTo({ top: 0, left: 0, behavior: "instant" });
      } else {
        // fallback → window scroll
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
