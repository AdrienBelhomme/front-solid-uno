import { createContext, createEffect, JSXElement, useContext } from "solid-js";
import { atom, Atom } from "solid-use";

const ThemeContext = createContext<{ dark: Atom<boolean>, switcher: () => void }>()

export const ThemeProvider = (props: { children: JSXElement }) => {
  const dark = atom(localStorage.getItem("dark-theme") === "true" ? true : false);
  const switcher = () => {
    dark(!dark());
  };

  createEffect(() => {
    localStorage.setItem("dark-theme", dark().toString());
    if (dark()) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <ThemeContext.Provider value={{ dark, switcher }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useSwitcher = () => { return useContext(ThemeContext) }