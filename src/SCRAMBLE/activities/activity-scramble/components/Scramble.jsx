import { useState, useEffect } from "react";
import ActivityCompleteAnimation from "../../../../components/ActivityCompleteAnimation";
import "../Scramble.css";
import TimeWidget from "../../../Timer.tsx";

const list = [
  // {
  //   correct: [
  {
    id: 1,
    item: "Today",
  },
  {
    id: 5,
    item: "version",
  },
  {
    id: 2,
    item: "I am",
  },
  {
    id: 4,
    item: "grateful ",
  },
  {
    id: 6,
    item: "of myself ",
  },
  {
    id: 7,
    item: "Pasta ",
  },
  {
    id: 8,
    item: "Gelato  ",
  },
  {
    id: 9,
    item: "Blueberries",
  },
  {
    id: 3,
    item: "the most",
  },
  //   ],
  // },
  // {
  //   incorrect: {
  //     incorrectWord: "jsidjf",
  //   },
  // },
];

console.log(list, "jijijiji");

function App(props) {
  const [itemsName, setItemsName] = useState([]);
  const [today] = useState(false);
  const [showNextAction] = useState(false);
  const [selected, setSelected] = useState([]);
  const [done, setDone] = useState(false);
  const [quizCount, setTotalQuizCount] = useState(0);
  const [goalId] = useState(6);
  const [totalQuiz] = useState(3);
  const [incorrect, setIncorrect] = useState(0);
  const [correctImage, setCorrectImage] = useState(false);
  const [showSentence, setShowSentence] = useState(false);
  const [incorrectImage, setIncorrectImage] = useState(false);
  const [incorrectSentence, setIncorrectSentence] = useState(false);

  function handleParentFunctionCall() {
    props.setFinalResultFromParent();
  }

  const removeMe = (index) =>
    setItemsName(itemsName.filter((_, i) => i !== index));

  // Sounds
  const correctPiece =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fcorrect-piece.m4a?alt=media&token=a1042c5a-5301-45db-a91e-7640269ba561";
  const incorrectPiece =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fincorrect-piece.m4a?alt=media&token=4868fc06-0da1-4637-9b29-455c41efd7f4";
  const correctSound =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fcorrect-action.m4a?alt=media&token=9690f66f-916e-48c0-a94c-813cab94691a";
  const incorrectAction =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fincorrect-action.m4a?alt=media&token=e2bd36ac-0967-41dc-b959-0359471e575c";

  // Images
  const correctImg =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_actions%2Fimages_actions_global%2Fimage-correct.webp?alt=media&token=14d68897-d349-4921-a286-2246362f3e00";
  const incorrectImg =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_actions%2Fimages_actions_global%2Fimage-incorrect.webp?alt=media&token=01353005-f9b2-4999-91ed-25c3a019a810";
  const img =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_themes%2Ftheme-11aff-gratitude.svg?alt=media&token=7ae70c73-355f-47fe-91ef-fce1e8393218";

  const getShuffledArr = (str, i) => {
    setTotalQuizCount((quizCount) => quizCount - 1);
    setSelected([]);
    const newArr = list.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    setDone(false);
    setItemsName(newArr);

    props.setCardCount(props.cardCount + 1);

    if (props.cardCount === 5) {
      props.handleChange();
      console.log("change");
    }
    if (props.cardCount === 9) {
      props.handleChange();
      console.log("change");
    }
    if (props.cardCount === 13) {
      props.handleChange();
      console.log("change");
    }
    if (props.cardCount === 17) {
      props.handleChange();
      console.log("change");
    }
    if (props.cardCount === 25) {
      props.handleChange();
      console.log("change");
    }

    if (props.cardCount === 29) {
      props.handleChange();
      console.log("change");
    }

    if (props.cardCount === 33) {
      props.handleChange();
      console.log("change");
    }
  };

  useEffect(() => {
    getShuffledArr();
  }, []);

  const check = () => {
    setIncorrect((incorrect) => incorrect + 1);
    if (incorrect + 1 > 1) {
      setIncorrectImage(true);
      setIncorrectSentence(false);
      setDone(true);
      setShowSentence(false);
      console.log("hello incorrect heree");
      setTimeout(() => {
        setIncorrectSentence(true);
        setIncorrectImage(false);
        props.setWrongCount(props.wrongCount + 1);
        setTimeout(() => {
          getShuffledArr();
        }, 2000);
      }, 2000);
      setIncorrect(0);
      setTimeout(() => {
        new Audio(incorrectAction).play();
      }, 500);
    }
  };
  let SecondsConfig =
    props.seconds === 60
      ? "00"
      : props.seconds < 10
      ? "0" + props.seconds
      : props.seconds;

  const handleSentence = () => {
    setDone(true);
    setCorrectImage(true);
    setShowSentence(false);
    setIncorrectImage(false);
    setIncorrectSentence(false);
    setTimeout(() => {
      setShowSentence(true);
      setDone(true);
      setCorrectImage(false);

      setTimeout(() => {
        getShuffledArr();
      }, 2000);
    }, 2000);
  };

  return (
    <>
      <TimeWidget
        timerDefaultValue={1}
        endTimerParentFunction={() => handleParentFunctionCall()}
      />
      {!showNextAction ? (
        <>
          <div className="points-timer">
            <div>
              <div
                className={
                  props.selectedColourIndex === 2
                    ? "timer-color"
                    : "timer-color2"
                }
              >
                <span className="dynamic_time">
                  {" "}
                  {props.minutes + ":" + SecondsConfig}
                </span>
              </div>
            </div>
            <div>
              <img className="image scramble-icon" src={img} alt="action-img" />
            </div>
            <div>
              <h2
                className={
                  props.selectedColourIndex === 2
                    ? "timer-color"
                    : "timer-color2"
                }
              >
                ambients: {props.points}
              </h2>
            </div>
          </div>
          {done === true ? (
            <div >
              {correctImage ? (
              <div className="correct-image-active">
              <div className="active done">
                <img width="100%" height="100%" src={correctImg} alt="correct" />
              </div>
            </div>
              ) : null}
              {incorrectImage === true ? (
                <div className="correct-image-active">
                  <div className=" active done">
                    <img width="100%" height="100%" src={incorrectImg} alt="correct" />
                  </div>
                </div>
              ) : null}

              {showSentence ? (
                <div className="correct_sentence_div">
                  <div className="corrected_sentence_div">
                    <h1>Today I'm the most grateful version of myself</h1>
                  </div>
                </div>
              ) : null}
              {incorrectSentence ? (
                <div className="incorrect_sentence_div">
                  <div className="corrected_sentence_div">
                    <h1>Today I'm the most grateful version of myself</h1>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div
              className="card-container"
              // style={correctImage ? { backgroundColor: "red" } : null}
              // style={{
              //   backgroundColor: correctImage === true ? 'red' : 'blue',
              // }}
            >
              <>
                <div className="sentences">
                
                  {itemsName.map((val, ind) => {
                    return (
                      <div
                        key={ind}
                        onClick={() => {
                          if (
                            (selected.length === 0 && val.id === 1) ||
                            (selected.length === 1 && val.id === 2) ||
                            (selected.length === 2 && val.id === 3) ||
                            (selected.length === 3 && val.id === 4) ||
                            (selected.length === 4 && val.id === 5) ||
                            (selected.length === 5 && val.id === 6)
                          ) {
                            console.log(selected.length);
                            if (val.id === goalId) {
                              if (quizCount === totalQuiz) {
                                props.addPoints();
                              } else {
                                // setTimeout(() => {
                                // setDone(true);
                                // setCorrectImage(true);
                                handleSentence();
                                // }, 1000);
                                setTimeout(() => {
                                  new Audio(correctSound).play();
                                }, 300);

                                props.addpoint();
                              }
                            }
                            setSelected((s) => [...s, val]);
                            new Audio(correctPiece).play();
                            removeMe(ind);

                            console.log("asasdsd", selected);
                          } else {
                            console.log("incorrect piece clicked");
                            new Audio(incorrectPiece).play();

                            check();
                          }
                        }}
                        className={itemsName === true ? "trans" : "transition"}
                      >
                        {/* {val.correct?.map((v) => { */}
                        {/* return( */}
                        <p className="word">{val.item}</p>
                        {/* )
                     })} */}
                      </div>
                    );
                  })}
                </div>
                <div className="full-sentence ">
                  <>
                    <div className={today ? "correct-words" : null}>
                      {selected.map((v, i) => {
                        return (
                          <span className="complete-sentence" key={i}>
                            {v.item + " "}
                          </span>
                        );
                      })}
                    </div>
                  </>
                </div>
                <div>
                  {/* {done ? (getShuffledArr() ? props.addPoints() : null) : null} */}
                  {/* {done ? <h1>jsi</h1> : null} */}
                </div>
              </>
            </div>
          )}
        </>
      ) : (
        <ActivityCompleteAnimation />
      )}
    </>
  );
}

export default App;
