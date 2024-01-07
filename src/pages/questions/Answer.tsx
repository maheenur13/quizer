/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/store/hook";
import { FC, useEffect, useState } from "react";
import TimerView from "./TimerView";
import { useNavigate } from "react-router-dom";
import AnswerForm from "./AnswerForm";

const Answer: FC = () => {
  const navigate = useNavigate();
  const { currentAttemptedQuiz } = useAppSelector((state) => state.quiz);

  const {
    user: { role },
  } = useAppSelector((state) => state.user);

  const [isTimeOut, setIsTimeOut] = useState(false);

  const handleTimeOut = () => {
    alert("ophh ");
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

  const handleQuizSubmission = (values: any) => {
    //
  };

  return (
    <div>
      <div>
        <TimerView handleTimeOut={handleTimeOut} />
      </div>
      <AnswerForm
        handleQuizSubmission={handleQuizSubmission}
        isTimeOut={isTimeOut}
        currentAttemptedQuiz={currentAttemptedQuiz}
      />
    </div>
  );
};

export default Answer;
