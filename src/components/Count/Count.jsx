import React, { useState, useEffect, useRef } from "react";
import "./Count.css";

const Count = () => {
  const [count, setCount] = useState(1000000000);
  const intervalId = useRef(null); // Используем useRef для сохранения ID интервала

  useEffect(() => {
    // Устанавливаем начальный интервал уменьшения на 3 в секунду
    intervalId.current = setInterval(() => {
      setCount((prevCount) => prevCount - 3);
    }, 1000);

    return () => clearInterval(intervalId.current); // Очистка интервала при размонтировании
  }, []);

  const startCounting = (decrementValue, interval) => {
    clearInterval(intervalId.current); // Очищаем текущий интервал
    intervalId.current = setInterval(() => {
      setCount((prevCount) => prevCount - decrementValue);
    }, interval);
  };

  const handleInteractionStart = () => {
    startCounting(1, 1000); // Уменьшаем на 1 каждые две секунды
  };

  const handleInteractionEnd = () => {
    startCounting(3, 1000); // Возвращаемся к уменьшению на 3 каждую секунду
  };

  return (
    <>
      <section className="count">
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