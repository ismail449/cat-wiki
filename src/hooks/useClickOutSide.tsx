import { RefObject, useEffect, useState } from "react";

export const useClickOutSide = (
  initialValue: boolean,
  ref: RefObject<HTMLDivElement>
) => {
  const [clickedOutSide, setClickedOutSide] = useState<boolean>(initialValue);
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLDivElement)) {
        return;
      }
      setClickedOutSide(true);
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [clickedOutSide, ref]);

  return { clickedOutSide, setClickedOutSide };
};
