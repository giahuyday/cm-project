import { create } from "zustand";

interface BackgroundState {
    backgroundImage: string;
    setBackgroundImage: (image: string) => void;
    resetBackground: () => void;
}

export const useBackgroundStore = create<BackgroundState>((set) => ({
    backgroundImage: "/public/background.jpg",
    setBackgroundImage: (image) => set({ backgroundImage: image }),
    resetBackground: () => set({ backgroundImage: "" }),
}));
