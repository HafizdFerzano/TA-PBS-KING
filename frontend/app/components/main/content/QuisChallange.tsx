import React from "react";
import QuizSection from "../../QuizSection";

function QuisChallange() {
  return (
    <section>
      <div className="bg-yellow-500 h-12 w-2/3  absolute ml-2.5 mt-2.5 rounded-4xl opacity-80">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl text-blue-800 font-extrabold items-center">
            Fitur Lanjutan, Masih dalam tahap lanjutan development
          </h1>
        </div>
      </div>

      <QuizSection />
    </section>
  );
}

export default QuisChallange;
