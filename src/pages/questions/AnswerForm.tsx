/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuizDetails } from "@/interfaces";
import { Button, Col, Form, Radio, Row } from "antd";
import { FC } from "react";

type PropsType = {
  handleQuizSubmission: (values: any) => void;
  isTimeOut: boolean;
  currentAttemptedQuiz: QuizDetails;
};

const AnswerForm: FC<PropsType> = ({
  handleQuizSubmission,
  isTimeOut,
  currentAttemptedQuiz,
}) => {
  return (
    <Row justify={"center"}>
      <Col span={12}>
        <Form
          disabled={isTimeOut}
          name="answers"
          layout="vertical"
          onFinish={handleQuizSubmission}
        >
          {currentAttemptedQuiz?.questions.map((question, questionIndex) => (
            <Form.Item
              className="border px-4 py-6 rounded shadow shadow-zinc-100 bg-slate-100"
              name={[`answers`, `${questionIndex}`, "value"]}
              key={questionIndex}
              label={
                <h6 className="font-semibold">
                  {questionIndex + 1}. {question.title}
                </h6>
              }
              rules={[
                {
                  required: true,
                  message: `please select the answer`,
                },
              ]}
            >
              <Radio.Group key={questionIndex}>
                {Object.entries(question.options[0]).map(
                  ([optionKey, optionValue]) => {
                    return (
                      <Radio key={optionKey} value={optionValue}>
                        {`${optionValue}`}
                      </Radio>
                    );
                  }
                )}
              </Radio.Group>
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              className="bg-blue-500 w-full h-10"
              type="primary"
              htmlType="submit"
            >
              Submit Quiz
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AnswerForm;
