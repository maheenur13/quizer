/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/store/hook";
import { FC, useEffect, useState } from "react";
import TimerView from "./TimerView";
import { useNavigate } from "react-router-dom";
import AnswerForm from "./AnswerForm";
import { Form, RadioChangeEvent } from "antd";
import { IAnswerType, IOptionType, IQuestionType } from "@/interfaces";
import { handleAddToAnswerList } from "@/store/features/quiz/quiz.actions";

const Answer: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { currentAttemptedQuiz } = useAppSelector((state) => state.quiz);

  const {
    user: { role, id },
  } = useAppSelector((state) => state.user);

  const [quizAnswer, setQuizAnswer] = useState<IAnswerType>({
    answer: [],
    answerAt: null,
    studentId: id,
    isSubmitted: false,
    quizTitle: currentAttemptedQuiz?.quizTitle as string,
    previousAnswers: [],
  });

  const [isTimeOut, setIsTimeOut] = useState(false);

  const handleTimeOut = () => {
    setIsTimeOut(true);
  };

  useEffect(() => {
    if (role === "admin") {
      navigate("/");
    }
  }, [navigate, role]);

  if (!currentAttemptedQuiz) {
    return (
      <p className="text-red-600 text-center mt-5">
        You did not participate in this quiz yet!
      </p>
    );
  }

  const handleQuizSubmission = () => {
    const answer = { ...quizAnswer };
    const currentDate = new Date();
    answer.answerAt = currentDate.toLocaleDateString();
    answer.isSubmitted = true;

    handleAddToAnswerList(answer);
    setIsTimeOut(true);
    navigate("/answers");
  };
  const handleChange = (
    e: RadioChangeEvent,
    option: IOptionType,
    options: IQuestionType["options"],
    index: number,
    title: string
    // _optionKey: string,
    // optionValue: unknown
  ) => {
    const latestAnswer = { ...quizAnswer };

    const newOptions = [...options];
    newOptions[index] = {
      ...option,
      isSelected: e.target.checked,
    };

    latestAnswer.answer.push({
      options: newOptions,
      title: title,
    });

    setQuizAnswer(latestAnswer);
  };

  return (
    <div>
      <div>
        <TimerView handleTimeOut={handleTimeOut} />
      </div>
      <AnswerForm
        handleChange={handleChange}
        form={form}
        handleQuizSubmission={handleQuizSubmission}
        isTimeOut={isTimeOut}
        questions={currentAttemptedQuiz.questions}
      />
    </div>
  );
};

export default Answer;
