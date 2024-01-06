import { QuizDetails } from '@/interfaces';
import { Card, Popconfirm, Tag } from 'antd';
import { FC } from 'react'


type PropsType = {
    quizItem: QuizDetails;
    onClick: () => void
}

const QuizPreview: FC<PropsType> = ({ quizItem, onClick }) => {
    return (
        <Popconfirm
            autoAdjustOverflow
            destroyTooltipOnHide
            placement="bottom"
            title={"Are you sure to attempt the quiz?"}
            description={<div>
                <h6>
                    Total question: {quizItem.no_of_question}
                </h6>
                <h6>
                    Duration: {quizItem.duration} minuites
                </h6>
                <h6>
                    Total attempts: {quizItem.totalAttempts}
                </h6>
            </div>}
            okText="Yes"
            cancelText="No"
        >
            <Card
                onClick={onClick}
                style={{ width: "100%" }}
                title={quizItem.quizTitle}
                bordered={true}
            >
                <div>
                    <Tag>{quizItem.quizCategory}</Tag>
                </div>
            </Card>
        </Popconfirm>

    )
}

export default QuizPreview;
