import { useState, useEffect, useRef } from "react";

const useDidClickOutside = () => {
  const [didClickOutside, setDidClickOutside] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDidClickOutside(true);
        return;
      }
      setDidClickOutside(false);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return { ref, didClickOutside };
};

export default useDidClickOutside;
