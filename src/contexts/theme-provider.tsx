import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Theme = "dark" | "light";
type StoredTheme = Theme | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: StoredTheme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  systemTheme: Theme;
  storedTheme: StoredTheme;
  setTheme: (theme: StoredTheme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [storedTheme, setStoredTheme] = useState<StoredTheme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  const systemTheme = useMemo(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  const theme = useMemo(() => {
    const theme = storedTheme === "system" ? systemTheme : storedTheme;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    return theme;
  }, [storedTheme]);

  const setTheme = useCallback((theme: StoredTheme) => {
    localStorage.setItem(storageKey, theme);
    setStoredTheme(theme);
  }, []);

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        systemTheme,
        storedTheme,
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
