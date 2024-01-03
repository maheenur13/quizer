import { QuizDetails } from "@/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type IStateType = {
  isQuizModalOpen: boolean;
  quizList: QuizDetails[];
  quizFormMode: "create" | "edit";
  questionFormMode: "create" | "edit";
  isQuestionModalOpen: boolean;
};

const initialState: IStateType = {
  quizList: [],
  isQuizModalOpen: false,
  quizFormMode: "create",
  isQuestionModalOpen: false,
  questionFormMode: "create",
};

const userSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuizToList: (state, action: PayloadAction<QuizDetails>) => {
      const latestQuiz: QuizDetails[] = [
        {
          ...action.payload,
          key: state.quizList[0]?.key + 1 || 1,
          totalAttempts: 0,
          visibility: false,
          totalSubmissions: 0,
          questions: [],
          quizSubMissionDetails: [],
          createdAt: new Date().toISOString(),
        },
        ...state.quizList,
      ];
      localStorage.setItem("questionSet", JSON.stringify(latestQuiz));
      state.quizList = latestQuiz;
    },
    syncQuizFromDB: (state) => {
      const localQuestionSets = localStorage.getItem("questionSet");
      if (localQuestionSets) {
        state.quizList = JSON.parse(localQuestionSets);
      }
    },
    updateQuiz: (state, action: PayloadAction<QuizDetails>) => {
      const latestQuiz = [...state.quizList].map((quiz) => {
        if (quiz.key === action.payload.key) {
          quiz = {
            ...quiz,
            ...action.payload,
            no_of_question: action.payload.questions?.length || 0,
          };
        }
        return quiz;
      });
      localStorage.setItem("questionSet", JSON.stringify(latestQuiz));
      state.quizList = latestQuiz;
    },

    removeQuizFromList: (state, action: PayloadAction<QuizDetails["key"]>) => {
      const latestQuiz = [...state.quizList].filter(
        (quiz) => quiz.key !== action.payload
      );
      localStorage.setItem("questionSet", JSON.stringify(latestQuiz));
      state.quizList = latestQuiz;
    },
    openQuizModal: (state) => {
      state.isQuizModalOpen = true;
    },
    closeQuizModal: (state) => {
      state.isQuizModalOpen = false;
    },
    handleQuestionModal: (state, action: PayloadAction<boolean>) => {
      state.isQuestionModalOpen = action.payload;
    },
    quizVisibility: (
      state,
      action: PayloadAction<{ key: number; value: boolean }>
    ) => {
      const latestQuiz: QuizDetails[] = state.quizList.map((quiz) => {
        if (quiz.key === action.payload.key) {
          quiz.visibility = action.payload.value;
          quiz.publishedAt = action.payload.value
            ? new Date().toISOString()
            : null;
        }
        return quiz;
      });
      localStorage.setItem("questionSet", JSON.stringify(latestQuiz));
      state.quizList = latestQuiz;
    },
    setQuizFormMode: (
      state,
      action: PayloadAction<IStateType["quizFormMode"]>
    ) => {
      state.quizFormMode = action.payload;
    },
    setQuestionFormMode: (
      state,
      action: PayloadAction<IStateType["questionFormMode"]>
    ) => {
      state.questionFormMode = action.payload;
    },
  },
});

export const {
  addQuizToList,
  removeQuizFromList,
  closeQuizModal,
  openQuizModal,
  setQuizFormMode,
  quizVisibility,
  updateQuiz,
  syncQuizFromDB,
  handleQuestionModal,
  setQuestionFormMode,
} = userSlice.actions;

export default userSlice.reducer;
