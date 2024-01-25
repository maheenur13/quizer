import { QuizDetails } from "@/interfaces";
import { Card, Popconfirm, Tag } from "antd";
import { FC } from "react";
import { ClockCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/store/hook";

type PropsType = {
  quizItem: QuizDetails;
  handleOnConfirm: (quizItem: QuizDetails) => void;
};

const QuizPreview: FC<PropsType> = ({ quizItem, handleOnConfirm }) => {
  const {
    user: { role },
  } = useAppSelector((state) => state.user);
  return (
    <Card style={{ width: "100%" }} title={quizItem.quizTitle} bordered={true}>
      <div>
        <Tag color="orange">{quizItem.quizCategory}</Tag>
        <Tag color="pink-inverse">
          <ClockCircleOutlined /> {quizItem.duration}m
        </Tag>
      </div>
      <div>
        <Popconfirm
          destroyTooltipOnHide
          placement="bottom"
          title={"Are you sure to attempt the quiz?"}
          description={
            <div>
              <h6>Total question: {quizItem.no_of_question}</h6>
              <h6>Duration: {quizItem.duration} minuites</h6>
              <h6>Total attempts: {quizItem.totalAttempts}</h6>
            </div>
          }
          okButtonProps={{
            disabled: role === "admin",
          }}
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleOnConfirm(quizItem)}
        >
          <PlayCircleOutlined
            style={{
              marginTop: "1rem",
              fontSize: "2rem",
              color: "#636363",
            }}
          />
        </Popconfirm>
      </div>
    </Card>
  );
};

export default QuizPreview;
