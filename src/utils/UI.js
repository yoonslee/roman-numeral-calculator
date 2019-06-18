import { useState, useEffect } from "react";

class UI {
  static BREAKPOINTS = [768, 375];

  static MEDIA_QUERIES = this.BREAKPOINTS.map(
    bp => `@media (max-width: ${bp}px)`
  );

  static THEMES_KEYS = {
    CLASSIC: "CLASSIC",
    EXPERIMENTAL: "EXPERIMENTAL"
  };

  static BUTTON_TYPES = {
    EDIT: "EDIT",
    OPERATION: "OPERATION",
    NUMERAL: "NUMERAL"
  };

  static useWindowSize = () => {
    const isClient = typeof window === "object";

    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
      if (!isClient) {
        return false;
      }

      function handleResize() {
        setWindowSize(getSize());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
  };

  static vibrate = () => {
    navigator.vibrate =
      navigator.vibrate ||
      navigator.webkitVibrate ||
      navigator.mozVibrate ||
      navigator.msVibrate;

    if (navigator.vibrate) {
      // vibration API supported
      navigator.vibrate(200);
    }
  };
}

export default UI;
