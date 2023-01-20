"use client";
import React, { useState, useEffect, useRef } from "react";
import "../app.css";

interface Props {
  timerDefaultValue: number;
  endTimerParentFunction: (minutes: number, seconds: number) => void;
}

const TimeWidget: React.FC<Props> = (props: Props) => {
  const [minutes, setMinutes] = useState(props.timerDefaultValue);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isPaused) {
      if (minutes === 0 && seconds === 0) {
        props.endTimerParentFunction(minutes, seconds);
      } else {
        intervalId.current = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          } else if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            props.endTimerParentFunction(minutes, seconds);
          }

          // console.log(minutes + ":" + seconds)
          let dynamicSecs =
            seconds === 0 ? "00" : seconds < 10 ? "0" + seconds : seconds;
          document.querySelector(".dynamic_time")!.innerHTML =
            minutes + ":" + dynamicSecs;
        }, 1000);
      }
    }
    return () => clearInterval(intervalId.current!);
  }, [minutes, seconds, isPaused]);

  const handlePause = () => {
    setIsPaused(!isPaused);
    if (intervalId.current && !isPaused) {
      clearInterval(intervalId.current);
    } else if (!intervalId.current && isPaused) {
      intervalId.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // setFinalResult();
        }
      }, 1000);
    }
  };

  return (
    <>
      <div className="pause_play_container">
        <button onClick={handlePause} className="pause-image">
          {isPaused ? (
            <img
              className="pause_image"
              src="https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_general_functions%2Ficon_play_button.png?alt=media&token=1880153a-9028-47f8-8394-d311aa5f1b22"
              alt=""
            />
          ) : (
            <img
            className="pause_image"

              src="https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_general_functions%2Ficon_pause_button.png?alt=media&token=0a2b2e0a-5436-46c2-893d-009f17ac5712"
              alt=""
            />
          )}
        </button>
      </div>
    </>
  );
};

export default TimeWidget;
