import React, { useState, useEffect, useRef } from "react";
import "./Count.css";

const Count = () => {
  // Получаем время последнего закрытия из localStorage
  const lastTime = Number(localStorage.getItem("lastTime"));
  const currentTime = Date.now();
  const timeDifference = Math.floor((currentTime - lastTime) / 1000); // Разница в секундах

  // Пытаемся получить начальное значение счетчика из localStorage, иначе используем 1000000000
  // Корректируем начальное значение счетчика на основе времени, прошедшего с последнего закрытия
  const initialCount = Number(localStorage.getItem("count")) || 1000000000;
  const correctedInitialCount = initialCount - timeDifference * 3; // Уменьшаем на 3 каждую секунду
  const [count, setCount] = useState(correctedInitialCount);
  const intervalId = useRef(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount - 3;
        localStorage.setItem("count", newCount.toString());
        return newCount;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
      localStorage.setItem("lastTime", Date.now().toString()); // Сохраняем время закрытия
    };
  }, []);

  const startCounting = (decrementValue, interval) => {
    clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount - decrementValue;
        localStorage.setItem("count", newCount.toString());
        return newCount;
      });
    }, interval);
  };

  const handleInteractionStart = () => {
    startCounting(1, 1000);
  };

  const handleInteractionEnd = () => {
    startCounting(3, 1000); // Исправлено на уменьшение на 3, чтобы соответствовать описанию
  };

  return (
    <>
      <section className="count">
        <div className="count__title">Версия 1.1</div>
        <div className="count__sum">{count}</div>
        <button
          onMouseDown={handleInteractionStart}
          onMouseUp={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
        >
          Нажать
        </button>
      </section>
    </>
  );
};

export default Count;