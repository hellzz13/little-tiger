"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function RouletteWheel() {
  const roletaUm = ["🤖", "🐱", "🐶", "🌎", "🌟"];

  const roletaDois = ["🤖", "🐱", "🐶", "🌎", "🌟"];

  const roletaTres = ["🤖", "🐱", "🐶", "🌎", "🌟"];

  function getRandomEmoji(array: string[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const [result1, setResult1] = useState("❓");
  const [result2, setResult2] = useState("❓");
  const [result3, setResult3] = useState("❓");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const isDefaultResult = result1 == "❓" || result2 == "❓" || result3 == "❓";
  const isPlayerWinner =
    result1 == result2 && result2 == result3 && !isRunning && !isDefaultResult;

  useEffect(() => {
    if (isPlayerWinner) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      confetti({ particleCount: 120, spread: 55, origin: { y: 0.6 } });
    }
  }, [isPlayerWinner]);

  function sortEmojis() {
    if (isRunning) return; // Evita múltiplos cliques simultâneos

    setIsRunning(true);

    const newResult1 = getRandomEmoji(roletaUm);
    const newResult2 = getRandomEmoji(roletaDois);
    const newResult3 = getRandomEmoji(roletaTres);

    setResult1(newResult1);
    setResult2(newResult2);
    setResult3(newResult3);

    let index = currentIndex;

    const interval = setInterval(() => {
      index = (index + 1) % roletaUm.length;
      setCurrentIndex(index);
    }, 200); // Troca de emoji a cada 200ms

    // Para a roleta após 5 segundos
    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
    }, 2000);
  }

  const finalResult1 =
    result1 == "❓" ? "❓" : isRunning ? roletaUm[currentIndex] : result1;
  const finalResult2 =
    result2 == "❓" ? "❓" : isRunning ? roletaDois[currentIndex] : result2;
  const finalResult3 =
    result3 == "❓" ? "❓" : isRunning ? roletaTres[currentIndex] : result3;

  const isDisabledRoulette = isDefaultResult ? false : isRunning;

  return (
    <>
      <h1 className="font-extrabold inline-block bg-gradient-to-r from-blue-600 via-slate-800-500 to-indigo-400 bg-clip-text text-4xl md:text-5xl text-transparent">
        Teste sua sorte
      </h1>
      <div className="flex flex-col gap-6 w-fit p-6 md:p-12 bg-slate-800 rounded-md">
        <div className="text-7xl flex gap-2 justify-center">
          <span className="bg-white p-3 rounded-lg">{finalResult1} </span>
          <span className="bg-white p-3 rounded-lg">{finalResult2}</span>
          <span className="bg-white p-3 rounded-lg">{finalResult3}</span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="text-purple-400 font-bold flex gap-2 justify-center">
            {isPlayerWinner && "Você venceu!"}
          </div>
          <button
            disabled={isDisabledRoulette}
            className="disabled:cursor-not-allowed font-semibold w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={sortEmojis}
          >
            Girar
          </button>
        </div>
      </div>
    </>
  );
}
