import { useEffect, } from "react";

// Custom Hooks
export function useWindowTitle(newWindowTitle: string) {

  useEffect(
    () => {
      const currentTitle = window.document.title;
      console.log("Use Effect!", Date.now());
      window.document.title = newWindowTitle;

      // "Clean up"-Funktion
      return () => {
        window.document.title = currentTitle;
      };
    },
    // "Dependency Array"
    [newWindowTitle],
  );
}
