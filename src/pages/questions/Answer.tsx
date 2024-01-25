/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/store/hook";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal, RadioChangeEvent } from "antd";
import { IAnswerType, IOptionType, IQuestionAnswerType } from "@/interfaces";
import { handleAddToAnswerList } from "@/store/features/quiz/quiz.actions";
import { AnswerForm, TimerView } from "@/components/answer";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Answer: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { currentAttemptedQuiz } = useAppSelector((state) => state.quiz);

  const {
    user: { role, id },
  } = useAppSelector((state) => state.user);

  const [modal, contextHolder] = Modal.useModal();

  const [quizAnswer, setQuizAnswer] = useState<IAnswerType>({
    answer: [],
    answerAt: null,
    studentId: id as number,
    isSubmitted: false,
    quizTitle: currentAttemptedQuiz?.quizTitle as string,
    previousAnswers: [],
    totalScore: 0,
    outOfScore: 0,
  });

  const [isTimeOut, setIsTimeOut] = useState(false);

  const handleTimeOut = () => {
    setIsTimeOut(true);
  };

  const confirm = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: (
        <p className="text-red-500">
          Time limit exceeded! Quiz will be auto submitted!
        </p>
      ),
      footer: (
        <div className="text-center px-5 pt-5">
          <Button
            onClick={() => {
              const answer = { ...quizAnswer };
              const currentDate = new Date();
              answer.answerAt = currentDate.toLocaleDateString();
              answer.isSubmitted = true;
              if (answer.answer?.length === 0) {
                answer.answer = currentAttemptedQuiz?.questions.map((item) => {
                  return {
                    mark: 0,
                    options: item.options,
                    title: item.title,
                  };
                }) as IQuestionAnswerType[];
              } else {
                const currentAnswer = [...answer.answer];
                const restAnswer = currentAttemptedQuiz?.questions
                  .filter(
                    (item) =>
                      !currentAnswer.some((ans) => ans.title === item.title)
                  )
                  .map((qz) => {
                    const newQz = { ...qz };
                    const correctAnswer = newQz.correctAnswer;
                    delete newQz.correctAnswer;
                    newQz.mark = 0;
                    newQz.options = newQz.options.map((item, idx) => {
                      return {
                        ...item,
                        isCorrect: correctAnswer === idx + 1,
                      };
                    });

                    return newQz;
                  }) as IQuestionAnswerType[];

                answer.answer = [...currentAnswer, ...restAnswer];
              }

              let totalScore = 0;
              for (let i = 0; i < answer.answer.length; i++) {
                totalScore += answer.answer[i].mark;
              }

              handleAddToAnswerList({ ...answer, totalScore });

              navigate("/answers");
              console.log("hello");
            }}
          >
            I Agree
          </Button>
        </div>
      ),
    });
  };

  useEffect(() => {
    if (isTimeOut) {
      confirm();
    }
  }, [isTimeOut]);
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
    let totalScore = 0;
    for (let i = 0; i < answer.answer.length; i++) {
      totalScore += answer.answer[i].mark;
    }

    handleAddToAnswerList({ ...answer, totalScore });

    navigate("/answers");
  };
  const handleChange = (
    e: RadioChangeEvent,
    option: IOptionType,
    options: IOptionType[],
    index: number,
    title: string,
    questionIndex: number
  ) => {
    const latestAnswer = { ...quizAnswer };

    const newOptions = [...options];
    newOptions[index] = {
      ...option,
      isSelected: e.target.checked,
    };

    const finalOption = newOptions.map((item, idx) => {
      return {
        ...item,
        isCorrect:
          currentAttemptedQuiz.questions[questionIndex].correctAnswer ===
          idx + 1,
      };
    });

    const isOptionExist = latestAnswer.answer.find(
      (itm) => itm.title === title
    );

    if (isOptionExist) {
      latestAnswer.answer[questionIndex].options = finalOption;
      latestAnswer.answer[questionIndex].mark = (
        currentAttemptedQuiz.questions[questionIndex].correctAnswer ===
        index + 1
          ? currentAttemptedQuiz.questions[questionIndex].mark
          : 0
      ) as number;
    } else {
      latestAnswer.answer.push({
        options: finalOption,
        title: title,
        mark: (currentAttemptedQuiz.questions[questionIndex].correctAnswer ===
        index + 1
          ? currentAttemptedQuiz.questions[questionIndex].mark
          : 0) as number,
      });
    }

    setQuizAnswer({ ...latestAnswer });
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
        title={currentAttemptedQuiz.quizTitle}
      />
      {contextHolder}
    </div>
  );
};

export default Answer;
