import React, { useEffect, useState } from "react";
import ActivityCompleteAnimation from "./components/ActivityCompleteAnimation";
import Scramble from "../src/SCRAMBLE/activities/activity-scramble/components/Scramble";
import "./app.css";

const colors = ["#efefef", "#a7e894", "#121619", "#da9ae8"];

const App = () => {
  const [counter, setCounter] = React.useState(60);
  const [finalResult, setFinalResult] = useState(false);
  const [points, setPoints] = useState(0);
  const [cardCount, setCardCount] = useState(1);
  const [wrongCount, setWrongCount] = useState(0);
  const [selectedColourIndex, setColourIndex] = useState(0);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    setTimeout(() => {
      setFinalResult(true);
    }, 60000);
  }, [counter]);

  const completedSound =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fcorrect-action.m4a?alt=media&token=a1042c5a-5301-45db-a91e-7640269ba561";

  useEffect(() => {
    setTimeout(() => {
      new Audio(completedSound).play();
    }, 60000);
  }, []);

  const addpoint = () => {
    setPoints(points + 1);
  };

  const minusPoints = () => {
    setWrongCount(wrongCount + 1);
  };

  const [activityCount, setActivityCount] = useState(0);

  useEffect(() => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setActivityCount(color);
    console.log(color, "asas");
  }, []);

  const handleChange = (str, n) => {
    const newColourIndex = selectedColourIndex + 1;
    if (colors[newColourIndex]) setColourIndex(newColourIndex);
    else setColourIndex(0);
  };

  return (
    <div
      className="activity-scramble-background"
      style={{ backgroundColor: colors[selectedColourIndex] }}
    >
      {finalResult ? (
        <ActivityCompleteAnimation
          points={points}
          setPoints={setPoints}
          setWrongCount={setWrongCount}
          wrongCount={wrongCount}
        />
      ) : (
        <>
          <Scramble
            counter={counter}
            addpoint={addpoint}
            minusPoints={minusPoints}
            points={points}
            setActivityCount={setActivityCount}
            activityCount={activityCount}
            handleChange={handleChange}
            cardCount={cardCount}
            setCardCount={setCardCount}
            setPoints={setPoints}
            setWrongCount={setWrongCount}
            wrongCount={wrongCount}
          />
        </>
      )}
    </div>
  );
};

export default App;
