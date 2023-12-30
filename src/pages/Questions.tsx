import QuizList from "@/components/QuizList";
import QuizForm from "@/components/QuizForm";
import { QuizDetails } from "@/interfaces";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import { FC, useEffect, useState } from "react";

const Questions: FC = () => {
  const [quizes, setQuizes] = useState<QuizDetails[]>([]);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const localQuestionSets = localStorage.getItem("questionSet");
    if (localQuestionSets) {
      setQuizes(JSON.parse(localQuestionSets));
    }
  }, []);

  const onCreate = (values: QuizDetails) => {
    const allQuiz = [values, ...quizes];
    localStorage.setItem("questionSet", JSON.stringify(allQuiz));
    setQuizes((prev) => [values, ...prev]);
    setIsQuizModalOpen(false);
  };

  const onDeleteQuiz = (values: QuizDetails, index: number) => {
    const restQuiz = [...quizes].filter((_, idx) => idx !== index);
    setQuizes(restQuiz);
    localStorage.setItem("questionSet", JSON.stringify(restQuiz));
  };

  return (
    <div className="p-4">
      <div className="text-right">
        <Button
          type="primary"
          className="bg-blue-500 mb-3"
          icon={<PlusCircleOutlined />}
          size={"middle"}
          onClick={() => setIsQuizModalOpen(true)}
        >
          Add Quiz
        </Button>
      </div>
      {quizes?.length > 0 ? (
        <>
          <QuizList quizes={quizes} onDeleteQuiz={onDeleteQuiz} />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No quiz!" />
      )}
      <>
        <QuizForm
          open={isQuizModalOpen}
          onCancel={() => {
            setIsQuizModalOpen(false);
          }}
          onCreate={onCreate}
        />
      </>
    </div>
  );
};

export default Questions;
