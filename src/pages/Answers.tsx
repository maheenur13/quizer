/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/store/hook";
import { Button, Table } from "antd";
import { FC, useState } from "react";
import userList from "../../mockdata";
import { ColumnsType } from "antd/es/table";
import { IAnswerType } from "@/interfaces";
import ViewCurrentAnswer from "@/components/ViewCurrentAnswer";

const Answers: FC = () => {
  const { answerList } = useAppSelector((state) => state.quiz);
  const {
    user: { role, id },
  } = useAppSelector((state) => state.user);

  const [isCurrentAnswerModalOpen, setIsCurrentAnswerModalOpen] =
    useState<boolean>(false);

  const [answerDetails, setAnswerDetails] = useState<IAnswerType>();

  const columns: ColumnsType<IAnswerType> = [
    {
      title: "SL",
      dataIndex: "index",
      key: "index",
      render: (_value, _record, index) => <>{index + 1}</>,
    },
    {
      title: "Quiz Name",
      dataIndex: "quizTitle",
      key: "quizTitle",
    },
    {
      title: "Answer Time",
      dataIndex: "answerAt",
      key: "answerAt",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (_value, record) => {
        const user = userList.find((user) => user.id === record.studentId);
        return <>{user?.username}</>;
      },
    },
    {
      title: "Current Answer",
      dataIndex: "answer",
      key: "answer",
      render: (_value, record) => {
        return (
          <>
            <Button
              onClick={() => {
                setAnswerDetails(record);
                setIsCurrentAnswerModalOpen(true);
              }}
              type="primary"
              className="bg-blue-700 text-white"
            >
              View
            </Button>
          </>
        );
      },
    },
    {
      title: "Previous Answers",
      dataIndex: "previousAnswers",
      key: "previousAnswers",
      render: (_value, record) => {
        if (!record?.previousAnswers?.length) {
          return <>Not found!</>;
        }
        return (
          <>
            <Button className="bg-green-700 text-white">View</Button>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        dataSource={
          role === "admin"
            ? answerList
            : [...answerList].filter((item) => item.studentId === id)
        }
        columns={columns}
        bordered
      />

      {answerDetails && (
        <ViewCurrentAnswer
          data={answerDetails}
          open={isCurrentAnswerModalOpen}
          setOpen={setIsCurrentAnswerModalOpen}
        />
      )}
    </div>
  );
};

export default Answers;
