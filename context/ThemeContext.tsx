import { FC, ReactNode, createContext, useEffect, useState } from "react";
type ThemeTypes =
  | "dark"
  | "cupcake"
  | "valentine"
  | "cyberpunk"
  | "retro"
  | "forest";

interface ThemeContextType {
  theme: ThemeTypes;
  setTheme: (theme: ThemeTypes) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

interface Props {
  children: ReactNode;
  initial?: ThemeTypes;
}

export const ThemeContextProvider: FC<Props> = ({
  children,
  initial = "dark",
}) => {
  const [theme, setTheme] = useState<ThemeTypes>(initial);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
