import { IAnswerType, QuizDetails } from "@/interfaces";
import store from "@/store/store";
import {
  addQuizToList,
  addToAnswerList,
  closeQuizModal,
  currentAttemptedQuiz,
  handleQuestionModal,
  openQuizModal,
  quizVisibility,
  removeQuizFromList,
  setQuestionFormMode,
  setQuizFormMode,
  syncAnswerList,
  syncAttemptedQuizFromDB,
  syncQuizFromDB,
  updateQuiz,
} from "./quiz.slice";

export const handleAddQuizMToQuizList = (quiz: QuizDetails) => {
  store.dispatch(addQuizToList(quiz));
};
export const handleUpdateQuiz = (quiz: QuizDetails) => {
  store.dispatch(updateQuiz(quiz));
};
export const handleRemoveQuizFromQuizList = (key: QuizDetails["key"]) => {
  store.dispatch(removeQuizFromList(key));
};
export const handleOpenMQuizModal = () => {
  store.dispatch(openQuizModal());
};
export const handleCloseMQuizModal = () => {
  store.dispatch(closeQuizModal());
};
export const handleSetQuestionModal = (value: boolean) => {
  store.dispatch(handleQuestionModal(value));
};
export const handleChangeQuizVisibility = (key: number, value: boolean) => {
  store.dispatch(quizVisibility({ key, value }));
};
export const handleChangeQuizFormMode = (type: "create" | "edit") => {
  store.dispatch(setQuizFormMode(type));
};
export const handleChangeQuestionFormMode = (type: "create" | "edit") => {
  store.dispatch(setQuestionFormMode(type));
};
export const handleSyncAllQuizFromDB = () => {
  store.dispatch(syncQuizFromDB());
};
export const handleSyncAttemptedQuizFromDB = () => {
  store.dispatch(syncAttemptedQuizFromDB());
};
export const handleAddToAnswerList = (values: IAnswerType) => {
  store.dispatch(addToAnswerList(values));
};
export const handleSyncAnswerList = () => {
  store.dispatch(syncAnswerList());
};
export const handleCurrentAttemptedQuiz = (values: QuizDetails) => {
  store.dispatch(currentAttemptedQuiz(values));
};
