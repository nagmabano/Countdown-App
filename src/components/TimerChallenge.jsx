import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer; // Timer ID for managing the timeout, to solve our issue we can move the timer variable outside the component function.
// But now this will be shared across all instances of the component. This  may result in unexpected behavior if multiple instances
//  of the component are rendered simultaneously.

export default function TimerChallenge({ title, targetTime }) {
  let timer = useRef(); // Using useRef to persist the timer ID across renders without causing re-renders.
  const dialog = useRef();
//   const [timerStarted, setTimerStarted] = useState(false);
//   const [timerExpired, setTimerExpired] = useState(false);

const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

if(timeRemaining <= 0) {
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000); // Resetting the timer for future attempts.
    dialog.current.open();
}

//   let timer; // Timer ID for managing the timeout, 
  // If we keep it here a new variable will be created on each render and the timer for setting the timer will not be 
  // similar to the one for clearing the timer.

  function handleStart() {
    // setTimerStarted(true);
    timer.current = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10)
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
    <ResultModal ref={dialog} targetTime={targetTime} result={"lost"} />
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={ timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? "Stop" : "Start"}Challenge
        </button>
      </p>
      <p className={timerIsActive ? "active" : undefined}>
        {timerIsActive ? "time is running..." : "timer inactive"}
      </p>
    </section>
    </>
  );
}
