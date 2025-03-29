import { create } from 'zustand';

interface ToastStore {
  showToast: boolean;
  triggerToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  showToast: true, // Always show toast
  triggerToast: () => set({ showToast: true }),
}));
