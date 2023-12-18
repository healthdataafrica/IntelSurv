import { create } from "zustand";

const mainStore = create((set) => ({
  currentActiveField: null,
  questionnaireElements: null,
  selectedFormField: null,
  isOpen: false,
  currentSession: 'NONE', 
  chatLogs:null,
  showHelpPage: null,

  setShowHelpPage: (value) => set((state) => ({
    showHelpPage: value
  })),

  setChatLogs: (value) => set((state) => ({
   chatLogs: value
  })),

  appendChatLogs: (newLogEntry) => set((state) => ({
    chatLogs: [...state.chatLogs, newLogEntry]
  })),

  setCurrentSession: (value) => set((state) => ({
    currentSession: value
  })),

  setCurrentActiveField: (value) => set((state) => ({
    currentActiveField: value
  })),
  setSelectedFormField: (value) => set((state) => ({
    selectedFormField: value
  })),
  setQuestionnaireElements: (value) => set((state) => ({
    questionnaireElements: value
  })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

const stores = {
  mainStore
};

export default stores;
