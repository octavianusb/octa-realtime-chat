import { create } from "zustand";

type ThemeStore = {
    theme: string;
    setTheme: (theme: string) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: localStorage.getItem("chat-theme") || "abyss",
    setTheme: (theme: string) => {
        set({ theme });
        localStorage.setItem("chat-theme", theme);
    },
}));