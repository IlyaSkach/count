import React, { useState, useEffect, useRef } from "react";
import "./Count.css";

const Count = () => {
  // Пытаемся получить начальное значение счетчика из localStorage, иначе используем 1000000000
  const initialCount = Number(localStorage.getItem("count")) || 1000000000;
  const [count, setCount] = useState(initialCount);
  const intervalId = useRef(null);

  useEffect(() => {
    // Устанавливаем начальный интервал уменьшения на 3 в секунду
    intervalId.current = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount - 3;
        localStorage.setItem("count", newCount.toString()); // Сохраняем новое значение в localStorage
        return newCount;
      });
    }, 1000);

    return () => clearInterval(intervalId.current); // Очистка интервала при размонтировании
  }, []);

  const startCounting = (decrementValue, interval) => {
    clearInterval(intervalId.current); // Очищаем текущий интервал
    intervalId.current = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount - decrementValue;
        localStorage.setItem("count", newCount.toString()); // Сохраняем новое значение в localStorage
        return newCount;
      });
    }, interval);
  };

  const handleInteractionStart = () => {
    startCounting(1, 1000); // Уменьшаем на 1 каждую секунду
  };

  const handleInteractionEnd = () => {
    startCounting(2, 1000); // Возвращаемся к уменьшению на 3 каждую секунду
  };

  return (
    <>
      <section className="count">
				<div className="count__title">Версия 0.1</div>
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