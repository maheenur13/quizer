/* eslint-disable @typescript-eslint/no-explicit-any */
import QuizList from "@/components/QuizList";
import QuizForm from "@/components/QuizForm";
import { IQuestionType, QuizDetails } from "@/interfaces";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Empty, Form, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import {
  handleAddQuizMToQuizList,
  handleChangeQuestionFormMode,
  handleChangeQuizFormMode,
  handleCloseMQuizModal,
  handleOpenMQuizModal,
  handleRemoveQuizFromQuizList,
  handleSetQuestionModal,
  handleUpdateQuiz,
  handleSyncAllQuizFromDB,
} from "@/store/features/quiz/quiz.actions";
import QuestionForm from "@/components/QuestionForm";

const Questions: FC = () => {
  const {
    quizList,
    isQuizModalOpen,
    quizFormMode,
    isQuestionModalOpen,
    questionFormMode,
  } = useAppSelector((state) => state.quiz);

  const [quizForm] = Form.useForm();
  const [questionForm] = Form.useForm();

  const [currentValues, setCurrentValues] = useState<QuizDetails | null>(null);

  useEffect(() => {
    handleSyncAllQuizFromDB();
  }, []);

  const onCreate = (values: QuizDetails) => handleAddQuizMToQuizList(values);
  const onUpdate = (values: QuizDetails) => handleUpdateQuiz(values);

  const onDeleteQuiz = (values: QuizDetails) =>
    handleRemoveQuizFromQuizList(values.key);

  const handleEditQuiz = (values: QuizDetails) => {
    handleChangeQuizFormMode("edit");

    setCurrentValues(values);
    handleOpenMQuizModal();
  };
  const handleAddQuestion = (values: QuizDetails) => {
    handleChangeQuestionFormMode("create");
    handleSetQuestionModal(true);

    setCurrentValues(values);
  };
  const handleEditQuestion = (values: QuizDetails) => {
    handleChangeQuestionFormMode("edit");
    handleSetQuestionModal(true);

    setCurrentValues({ ...values });
  };

  const handleQuestionSubmit = async () => {
    if (currentValues) {
      let newCurrentQuiz = {};
      if (questionFormMode === "create") {
        if (await questionForm.validateFields()) {
          newCurrentQuiz = {
            ...currentValues,
            questions: [
              ...(currentValues?.questions as IQuestionType[]),
              ...questionForm.getFieldsValue().questions,
            ],
          };
        }
        // }
      } else {
        newCurrentQuiz = {
          ...currentValues,
          questions: [...questionForm.getFieldsValue().questions],
        };
      }
      handleUpdateQuiz(newCurrentQuiz as QuizDetails);
      handleSetQuestionModal(false);
    }
  };

  return (
    <div className="p-1">
      <div className="text-right">
        <Button
          type="primary"
          className="bg-blue-500 mb-3"
          icon={<PlusCircleOutlined />}
          size={"middle"}
          onClick={() => {
            handleChangeQuizFormMode("create");
            handleOpenMQuizModal();
          }}
        >
          Add Quiz
        </Button>
      </div>
      {quizList?.length > 0 ? (
        <>
          <QuizList
            onDeleteQuiz={onDeleteQuiz}
            handleEditQuiz={handleEditQuiz}
            handleAddQuestion={handleAddQuestion}
            handleEditQuestion={handleEditQuestion}
          />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No quiz!" />
      )}
      <>
        <Modal
          open={isQuizModalOpen}
          title="Quiz Details"
          okText={quizFormMode === "create" ? "Create" : "Update"}
          centered
          okButtonProps={{
            style: {
              backgroundColor: "blue",
            },
          }}
          cancelText="Cancel"
          onCancel={async () => {
            quizForm.resetFields();
            handleCloseMQuizModal();
            setCurrentValues(null);
          }}
          destroyOnClose={true}
          onOk={() => {
            quizForm
              .validateFields()
              .then((values) => {
                quizForm.resetFields();
                if (quizFormMode === "create") {
                  onCreate({
                    ...values,
                  });
                } else {
                  onUpdate({ ...values, key: currentValues?.key });
                }
                handleCloseMQuizModal();
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          <QuizForm form={quizForm} defaultValue={currentValues} />
        </Modal>
      </>
      <>
        <Modal
          width={720}
          open={isQuestionModalOpen}
          title="Question Details"
          okText={questionFormMode === "create" ? "Add" : "Update"}
          destroyOnClose={true}
          onOk={handleQuestionSubmit}
          centered
          styles={{
            content: {
              maxHeight: "700px",

              overflowY: "auto",
            },
          }}
          okButtonProps={{
            style: {
              backgroundColor: "blue",
            },
          }}
          onCancel={async () => {
            handleSetQuestionModal(false);
            questionForm.resetFields();
          }}
        >
          <QuestionForm quizDetails={currentValues} form={questionForm} />
        </Modal>
      </>
    </div>
  );
};

export default Questions;
