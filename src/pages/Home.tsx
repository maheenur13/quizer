import { Card, Divider, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICategory, quizCategory } from "../../mockdata";
import { QuizDetails } from "@/interfaces";

interface ILiveQuizType {
  value: ICategory;
  label: string;
  quizes: QuizDetails[];
}

const Home: FC = () => {
  const [liveQuizes, setLiveQuizes] = useState<ILiveQuizType[]>([]);
  useEffect(() => {
    const currentLiveQuizes = localStorage.getItem("liveQuizes");

    const finalLiveQuiz: QuizDetails[] = JSON.parse(
      currentLiveQuizes as string
    );
    const groupedQuizzes = quizCategory
      .map((category) => {
        const categoryQuizzes = finalLiveQuiz.filter(
          (quiz) => quiz.quizCategory === category.value
        );
        return {
          value: category.value,
          label: category.label,
          quizes: categoryQuizzes,
        };
      })
      .filter((itm) => itm.quizes.length > 0);

    setLiveQuizes(groupedQuizzes);
  }, []);
  console.log(liveQuizes);

  return (
    <div className="bg-slate-100">
      {liveQuizes.map((quiz) => {
        return (
          <div
            style={{
              // backgroundColor: "white",

              padding: "1rem",
              maxWidth: "1500px",
              textAlign: "center",
              margin: "auto",
            }}
            key={quiz.value}
          >
            <h5 className="text-left font-semibold ml-2 ">
              {quiz.label} Quizes
            </h5>
            <Divider />
            <Swiper
              spaceBetween={50}
              slidesPerView={5}
              onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {quiz.quizes.map((quizItem) => (
                <SwiperSlide key={quizItem.key}>
                  <Card
                    style={{ width: "100%" }}
                    title={quizItem.quizTitle}
                    bordered={true}
                  >
                    <div>
                      <Tag>{quizItem.quizCategory}</Tag>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
