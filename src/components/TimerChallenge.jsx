import { useState } from "react";

let timer; // Timer ID for managing the timeout, to solve our issue we can move the timer variable outside the component function.

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

//   let timer; // Timer ID for managing the timeout, 
  // If we keep it here a new variable will be created on each render and the timer for setting the timer will not be 
  // similar to the one for clearing the timer.

  function handleStart() {
    setTimerStarted(true);
    timer = setTimeout(() => {
      setTimerExpired(true);
      alert("Time's up!");
    }, targetTime * 1000);
  }

  function handleStop() {
    clearTimeout(timer);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You Lost!!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={ timerStarted ? handleStop : handleStart}>
          {timerStarted ? "Stop" : "Start"}Challenge
        </button>
      </p>
      <p className={timerStarted ? "active" : undefined}>
        {timerStarted ? "time is running..." : "timer inactive"}
      </p>
    </section>
  );
}
