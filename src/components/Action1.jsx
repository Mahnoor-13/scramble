import { useState, useEffect } from "react";
import ActivityCompleteAnimation from "./ActivityCompleteAnimation";
import "../app.css";

const list = [
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
];

function App(props) {
  const [itemsName, setItemsName] = useState([]);
  const [today] = useState(false);
  const [showNextAction] = useState(false);
  const [selected, setSelected] = useState([]);
  const [done, setDone] = useState(false);
  const [quizCount, setTotalQuizCount] = useState(0);
  const [goalId] = useState(6);
  const [totalQuiz] = useState(3);
  const [wrong, setWrong] = useState(0);

  const removeMe = (index) =>
    setItemsName(itemsName.filter((_, i) => i !== index));
  const rightPluck =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fcorrect-piece.m4a?alt=media&token=a1042c5a-5301-45db-a91e-7640269ba561";
  const wrongPluck =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fincorrect-piece.m4a?alt=media&token=4868fc06-0da1-4637-9b29-455c41efd7f4";
  const correctSound =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fcorrect-action.m4a?alt=media&token=9690f66f-916e-48c0-a94c-813cab94691a";
  const wrongSound =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fincorrect-action.m4a?alt=media&token=e2bd36ac-0967-41dc-b959-0359471e575c";
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
    setWrong((wrong) => wrong + 1);
    if (wrong + 1 > 1) {
      setTimeout(() => {
        getShuffledArr();
      }, 1000);
      setWrong(0);
      props.setWrongCount(props.wrongCount + 1);
      setTimeout(() => {
        new Audio(wrongSound).play();
      }, 500);
    }
  };

  return (
    <>
      {!showNextAction ? (
        <>
          <div className="points-timer">
            <div>
              <h2 style={{ color: "#fff" }}>
                00{" "}
                {props.counter < 10
                  ? ` : 0${props.counter}`
                  : ` :${props.counter}`}
              </h2>
            </div>
            <div>
              <img className="image" src={img} alt="action-img" />
            </div>
            <div>
              <h2 style={{ color: "#fff" }}>Ambients: {props.points}</h2>
            </div>
          </div>
          <div className="card-container">
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
                              setTimeout(() => {
                                setDone(true);
                              }, 1000);
                              setTimeout(() => {
                                new Audio(correctSound).play();
                              }, 300);

                              props.addpoint();
                            }
                          }
                          setSelected((s) => [...s, val]);
                          new Audio(rightPluck).play();
                          removeMe(ind);

                          console.log("asasdsd", selected);
                        } else {
                          console.log("wrong clicked");
                          new Audio(wrongPluck).play();

                          check();
                        }
                      }}
                      className={itemsName === true ? "trans" : "transition"}
                    >
                      <p className="word">{val.item}</p>
                    </div>
                  );
                })}
              </div>
              <div className="full-sentence ">
                <>
                  <div className={today ? "correct-words" : null}>
                    {selected.map((v, i) => {
                      return <span key={i}>{v.item + " "}</span>;
                    })}
                  </div>
                </>
              </div>
              <div>
                {done ? (getShuffledArr() ? props.addPoints() : null) : null}
              </div>
            </>
          </div>
        </>
      ) : (
        <ActivityCompleteAnimation />
      )}
    </>
  );
}

export default App;
