import { useState, useEffect, memo } from "react";

const TypingEffect = memo(({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(displayText + text.charAt(index));
        setIndex(index + 1);
      }, 100); 

      return () => clearTimeout(timer);
    }
  }, [index, text, displayText]);

  return <span className="typing-text">{displayText}</span>;
});

export default TypingEffect;