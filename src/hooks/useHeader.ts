import { isServer } from "@/utils/constants";
import { useEffect, useState } from "react";

export const useHeader = () => {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    if (!isServer) {
      window.addEventListener("scroll", () => {
        const isScroll = window.scrollY > 80;
        setScroll(isScroll);
        const header = document.querySelector(".container-header");
        if (isScroll) {
          header?.classList.add("is-sticky");
        } else if (window.scrollY == 0) {
          header?.classList.remove("is-sticky");
        }
      });
    }
  }, []);
  return { scroll };
};
