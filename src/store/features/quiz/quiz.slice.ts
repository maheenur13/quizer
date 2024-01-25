import { IAnswerType, QuizDetails } from "@/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type IStateType = {
  isQuizModalOpen: boolean;
  quizList: QuizDetails[];
  quizFormMode: "create" | "edit";
  questionFormMode: "create" | "edit";
  isQuestionModalOpen: boolean;
  answerList: IAnswerType[];
  liveQuizList: QuizDetails[];
  currentAttemptedQuiz: QuizDetails | null;
};

const initialState: IStateType = {
  quizList: [],
  isQuizModalOpen: false,
  quizFormMode: "create",
  isQuestionModalOpen: false,
  questionFormMode: "create",
  answerList: [],
  liveQuizList: [],
  currentAttemptedQuiz: null,
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
    syncAttemptedQuizFromDB: (state) => {
      const localCurrentAttemptedQuiz = localStorage.getItem(
        "currentAttemptedQuiz"
      );
      if (localCurrentAttemptedQuiz) {
        state.currentAttemptedQuiz = JSON.parse(localCurrentAttemptedQuiz);
      }
    },
    updateQuiz: (state, action: PayloadAction<QuizDetails>) => {
      const latestQuiz = [...state.quizList].map((quiz) => {
        if (quiz.key === action.payload.key) {
          quiz = {
            ...quiz,
            ...action.payload,
            no_of_question:
              action.payload.questions?.length || quiz.questions.length,
          };
        }
        return quiz;
      });
      localStorage.setItem("questionSet", JSON.stringify(latestQuiz));
      state.quizList = latestQuiz;

      const currentLiveQuizes = latestQuiz.filter(
        (quiz) => quiz.visibility === true
      );
      localStorage.setItem("liveQuizes", JSON.stringify(currentLiveQuizes));
      state.liveQuizList = currentLiveQuizes;
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
      const currentLiveQuizes = latestQuiz.filter(
        (quiz) => quiz.visibility === true
      );
      localStorage.setItem("liveQuizes", JSON.stringify(currentLiveQuizes));
      state.liveQuizList = currentLiveQuizes;
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
    currentAttemptedQuiz: (state, action: PayloadAction<QuizDetails>) => {
      state.currentAttemptedQuiz = action.payload;

      localStorage.setItem(
        "currentAttemptedQuiz",
        JSON.stringify(state.currentAttemptedQuiz)
      );

      const latestQuiz = [...state.quizList].map((quiz) => {
        if (quiz.key === action.payload.key) {
          quiz = {
            ...quiz,
            ...action.payload,
            no_of_question:
              action.payload.questions?.length || quiz.questions.length,
          };
        }
        return quiz;
      });
      localStorage.setItem("questionSet", JSON.stringify(latestQuiz));
      state.quizList = latestQuiz;

      const currentLiveQuizes = latestQuiz.filter(
        (quiz) => quiz.visibility === true
      );
      localStorage.setItem("liveQuizes", JSON.stringify(currentLiveQuizes));
      state.liveQuizList = currentLiveQuizes;
    },
    addToAnswerList: (state, action: PayloadAction<IAnswerType>) => {
      const localData = localStorage.getItem("answerList");
      const finalData: IAnswerType[] = JSON.parse(localData as string) || [];
      const isQuizExist = [...finalData].find(
        (item) =>
          item.quizTitle === action.payload.quizTitle &&
          item.studentId === action.payload.studentId
      );

      if (isQuizExist) {
        const newData = [...(finalData as IAnswerType[])].map((item) => {
          const newItem = { ...item };
          if (
            item.quizTitle === isQuizExist.quizTitle &&
            item.studentId === isQuizExist.studentId
          ) {
            delete item.previousAnswers;
            newItem.previousAnswers?.push(item);
          }
          newItem.answer = action.payload.answer;
          newItem.answerAt = action.payload.answerAt;
          newItem.totalScore = action.payload.totalScore;

          return newItem;
        });

        state.answerList = newData;
      } else {
        state.answerList.push(action.payload);
      }

      localStorage.setItem("answerList", JSON.stringify(state.answerList));
    },
    syncAnswerList: (state) => {
      const localData = localStorage.getItem("answerList");
      const finalData = JSON.parse(localData as string);
      state.answerList = finalData || [];
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
  addToAnswerList,
  currentAttemptedQuiz,
  syncAttemptedQuizFromDB,
  syncAnswerList,
} = userSlice.actions;

export default userSlice.reducer;
