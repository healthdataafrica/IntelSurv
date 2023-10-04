import { create } from "zustand";

const mainStore = create((set) => ({
  currentActiveField: null,
  questionnaireElements: null,
  selectedFormField: null,



  setCurrentActiveField: (value) => set((state) => ({
    currentActiveField: value
  })),
  setSelectedFormField: (value) => set((state) => ({
    selectedFormField: value
  })),

  setQuestionnaireElements: (value) => set((state) => ({
    questionnaireElements: value
  })),

}));

export default {
  mainStore
};
