// app/components/QuizSection.tsx
"use client";

import { useState, useEffect,useRef } from "react";

const quizQuestions = [
  {
    question: "Which shape has 3 sides and 3 angles?",
    options: ["Triangle", "Square", "Circle", "Rectangle"],
    correct: "Triangle",
    explanation: "A triangle has exactly 3 sides and 3 angles.",
  },
  {
    question: "What is the area formula for a square?",
    options: [
      "side × side",
      "length × width",
      "½ × base × height",
      "π × radius²",
    ],
    correct: "side × side",
    explanation: "Area of a square is calculated by side × side.",
  },
  {
    question: "Which shape has no corners or edges?",
    options: ["Circle", "Square", "Triangle", "Rectangle"],
    correct: "Circle",
    explanation:
      "A circle has no corners or edges. It is a smooth round shape.",
  },
  {
    question: "How many lines of symmetry does a rectangle have?",
    options: ["2", "4", "1", "0"],
    correct: "2",
    explanation:
      "A rectangle has two lines of symmetry: vertical and horizontal.",
  },
  {
    question: "Which shape is used in the 'yield' traffic sign?",
    options: ["Triangle", "Circle", "Square", "Rectangle"],
    correct: "Triangle",
    explanation: "The yield sign is shaped like an inverted triangle.",
  },
];

//  File suara di public/sounds/
const SOUND_CORRECT = "/sounds/correct.mp3";
const SOUND_WRONG = "/sounds/wrong.mp3";
const SOUND_COMPLETE = "/sounds/complete.mp3";

export default function QuizSection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [volume, setVolume] = useState(0.7); // Default volume 70%

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inisialisasi audio
  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = (soundFile: string) => {
    if (audioRef.current) {
      audioRef.current.src = soundFile;
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .catch((e) => console.log("Autoplay prevented:", e));
    }
  };

  const current = quizQuestions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === current.correct) {
      setScore(score + 1);
      playSound(SOUND_CORRECT);
    } else {
      playSound(SOUND_WRONG);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
  };

  // Mainkan suara saat kuis selesai
  useEffect(() => {
    if (currentQuestionIndex >= quizQuestions.length) {
      playSound(SOUND_COMPLETE);
    }
  }, [currentQuestionIndex]);

  if (currentQuestionIndex >= quizQuestions.length) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <section id="quiz" className="py-16 px-4 bg-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 title-font text-yellow-300">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            Your score:{" "}
            <strong>
              {score}/{quizQuestions.length}
            </strong>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="mb-6">{getQuizMessage(score)}</p>
          <button
            onClick={resetQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-16 px-4 bg-blue-800 text-white">
      
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center title-font text-yellow-300">
          Shape Challenge!
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-blue-100">
          Test your knowledge with these fun shape questions!
        </p>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden text-gray-800">
          <div className="bg-blue-600 p-4 text-white">
            {/* Kontrol Volume */}
            <div className="flex  mb-4 justify-between items-center">
              <h3 className="text-xl font-bold">Quiz Time</h3>
              <div>
                <span className="mr-2 text-yellow-300">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 accent-yellow-400"
                  aria-label="Volume control"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-blue-100">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
              <span className="bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                Score: {score}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h4 className="text-xl font-bold mb-4">{current.question}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {current.options.map((opt, i) => {
                const isCorrect = selectedAnswer && opt === current.correct;
                const isWrong =
                  selectedAnswer === opt && opt !== current.correct;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    disabled={!!selectedAnswer}
                    className={`quiz-option bg-blue-100 hover:bg-blue-200 p-4 rounded-lg text-left transition-all ${
                      isCorrect ? "bg-green-300" : ""
                    } ${isWrong ? "bg-red-300" : ""}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="mt-4">
                <div className="p-4 rounded-lg mb-4 bg-opacity-90 bg-white">
                  <p className="font-bold text-gray-800">
                    {selectedAnswer === current.correct
                      ? "Correct! 🎉"
                      : "Oops! Try again!"}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    {current.explanation}
                  </p>
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        </div>
        {/* {showFeedback && selectedAnswer === current.correct && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none animate-ping">
            <div className="text-9xl text-yellow-300 opacity-70">✨</div>
          </div>
        )} */}
      </div>
    </section>
  );
}

function getQuizMessage(score: number) {
  const total = quizQuestions.length;
  const percentage = score / total;
  if (percentage === 1) return "Perfect! You're a shape expert! 🌟";
  if (percentage >= 0.8) return "Excellent! You know your shapes very well! 👍";
  if (percentage >= 0.6) return "Good job! Keep practicing to learn more! 💪";
  if (percentage >= 0.4)
    return "Not bad! Try the AR scanner to learn more about shapes.";
  return "Keep exploring! The AR scanner can help you learn more about shapes.";
}
