import { Card, Divider, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICategory, quizCategory } from "../../mockdata";
import { QuizDetails } from "@/interfaces";
import QuizPreview from "@/components/QuizPreview";
import { Navigation, Pagination, Virtual } from "swiper/modules";

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
    const groupedQuizzes = quizCategory?.map((category) => {
      const categoryQuizzes = finalLiveQuiz?.filter(
        (quiz) => quiz.quizCategory === category.value
      );
      return {
        value: category.value,
        label: category.label,
        quizes: categoryQuizzes,
      };
    })?.filter((itm) => itm.quizes?.length > 0) || [];

    setLiveQuizes(groupedQuizzes);
  }, []);

  const handleOpenAnswerModal = (quizItem: QuizDetails) => {
    console.log(quizItem);


  }

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
              className="py-5"
              modules={[Virtual, Navigation, Pagination]}
              spaceBetween={50}
              slidesPerView={4}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}

              navigation={true}
              virtual
              onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            >
              {quiz.quizes.map((quizItem) => (
                <SwiperSlide  className="cursor-pointer" key={quizItem.key}>
                  <QuizPreview onClick={() => handleOpenAnswerModal(quizItem)} quizItem={quizItem} />
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
