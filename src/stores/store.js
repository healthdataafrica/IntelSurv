import { create } from "zustand";

const mainStore = create((set) => ({
  currentActiveField: null,
  questionnaireElements: null,
  selectedFormField: null,
  isOpen: false,
  currentSession: 'NONE', 
  chatLogs:null,
  showHelpPage: null,
  originalData:[],
  filteredData:[],
  userToken:null,
  tokenMessageCount:null,
  tokenValidTo:null,
  openTokenModal:false,
  tokenMessage:null,

setTokenMessage: (value) => set((state) => ({
  tokenMessage: value
    })),
  setOpenTokenModal: (value) => set((state) => ({
    openTokenModal: value
    })),
  setTokenValidTo: (value) => set((state) => ({
    tokenValidTo: value
    })),
  setTokenMessageCount: (value) => set((state) => ({
    tokenMessageCount: value
    })),
    decrementTokenMessageCount: () => set((state) => ({
      tokenMessageCount: state.tokenMessageCount - 1
    })),
  setUserToken: (value) => set((state) => ({
  userToken: value
  })),

setOriginalData: (value) => set((state) => ({
    originalData: value
  })),
  setFilteredData: (value) => set((state) => ({
  filteredData: value
  })),

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
