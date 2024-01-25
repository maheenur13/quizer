import { IAnswerType } from "@/interfaces";
import { Collapse, CollapseProps, Modal } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { AnswerForm } from "./answer";

type PropsType = {
  isOpen: boolean;
  previousAnswers: IAnswerType[];
  setIsPreviousModalOpen: Dispatch<SetStateAction<boolean>>;
};

const PreviousAnswerList: FC<PropsType> = ({
  isOpen,
  previousAnswers,
  setIsPreviousModalOpen,
}) => {
  const items: CollapseProps["items"] = previousAnswers[0].previousAnswers?.map(
    (item, index) => {
      return {
        key: `${index}`,
        label: `Answer ${index + 1} - Score - ${item.totalScore}`,
        children: <AnswerForm mode="view" questions={item.answer} />,
      };
    }
  );

  return (
    <Modal
      destroyOnClose={true}
      title={`Previous Answer List - ${previousAnswers[0]?.quizTitle}`}
      open={isOpen}
      onOk={() => {
        setIsPreviousModalOpen(false);
      }}
      width={800}
      onCancel={() => {
        setIsPreviousModalOpen(false);
      }}
    >
      <Collapse items={items} defaultActiveKey={["0"]} />
    </Modal>
  );
};

export default PreviousAnswerList;
