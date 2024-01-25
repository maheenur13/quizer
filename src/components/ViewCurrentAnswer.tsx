import { IAnswerType } from "@/interfaces";
import { Modal } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { AnswerForm } from "./answer";

type PropsType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: IAnswerType;
};

const ViewCurrentAnswer: FC<PropsType> = ({ open, setOpen, data }) => {
  return (
    <Modal
      destroyOnClose={true}
      title={`Current Quiz Answer - ${data?.quizTitle} - Score - ${data?.totalScore}`}
      open={open}
      onOk={() => {
        setOpen(false);
      }}
      width={800}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <div className="my-6">
        <AnswerForm mode="view" questions={data.answer} />
      </div>
    </Modal>
  );
};

export default ViewCurrentAnswer;
