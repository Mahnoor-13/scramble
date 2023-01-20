import React, { useState } from "react";
import { useEffect } from "react";
import "./ActivityCompleteAnimation.css";

const AnimationPage = (props) => {
  // Variable Declaration\
  const [activityFinish, setActivityFinish] = useState(false);
  const [letsSee, setLetsSee] = useState(false);
  const [letsSeeAnimation, setLetsSeeAnimation] = useState(false);
  const [finalResults, setfinalResults] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [users, setUsers] = useState(["Dom", "Mic", "John", "Nick", "Daniel"]);
  const [currentUser, setCurrentUser] = useState("Jack");
  const [bonusPoints, setBonusPoints] = useState(0);

  const correctSound =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Factivity-complete-pluck.m4a?alt=media&token=b8587dbb-5c15-4e7a-840d-f778ecd14393";
  const LetsSeeImg =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_ambients%2Fambient_front.webp?alt=media&token=b2c3c62e-b8a9-4070-bafe-6d45b49ea4a6";
  const ActivityImg =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_ambients%2Fambient_back.webp?alt=media&token=c4a206ca-0ca5-4958-9b2d-133da99c423f";

  //   Timer For Activity Finish Page\
  useEffect(() => {
    const timer = setTimeout(() => {
      // Sound here\
      setActivityFinish(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  //   Timer For Lets see ambients Page

  useEffect(() => {
    const timer = setTimeout(() => {
      // Sound here
      setLetsSee(true);
    }, 3300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetsSeeAnimation(true);
    }, 4400);
    return () => clearTimeout(timer);
  }, []);

  //   Timer For Final Results

  useEffect(() => {
    const timer = setTimeout(() => {
      setfinalResults(true);
      finishedAudioSoundOne();
    }, 4400);
    return () => clearTimeout(timer);
  }, []);

  const finishedAudioSoundOne = () => {
    new Audio(correctSound).play();
  };

  useEffect(() => {
    if (props.points === 0) {
      setAccuracy(0);
    } else {
      let ambient = props.points + props.wrongCount;
      let _accuracy = ((props.points / ambient) * 100).toFixed();
      setAccuracy(_accuracy);
    }
  }, []);

  useEffect(() => {
    // Convert The array and current user into lower case

    const lowerArray = users.map((element) => {
      return element.toLowerCase();
    });
    setCurrentUser(currentUser.toLocaleLowerCase());

    if (lowerArray.includes(currentUser.toLocaleLowerCase())) {
      props.setPoints(props.points + 2);
      setBonusPoints(2);
    } else if (!lowerArray.includes(currentUser.toLocaleLowerCase())) {
      setBonusPoints(11);
      props.setPoints(props.points + 11);
    }
    console.log("Users", users);
    console.log("Current User", currentUser);
  }, []);

  return (
    <div className="main_container">
      {/* Final Results Part */}
      {finalResults ? (
        <div className="final_card_container">
          <p>Current User: {currentUser}</p>
          <p>ambients earned: {props.points}</p>
          <p>Wrong Answers: {props.wrongCount}</p>
          <p>accuracy: {accuracy}%</p>
          <p>bonus: {bonusPoints}</p>
          <p>total ambients: {props.points + 2}</p>
        </div>
      ) : letsSee ? (
        <div className="overflow">
          {/* Lets See Ambients Part */}

          <div
            className={
              letsSeeAnimation
                ? "inactive_img2"
                : "animation_page_img2_container"
            }
          >
            <img src={ActivityImg} alt="finished activity" />
          </div>
          <div className="animation_page_text_container">
            <span className={letsSeeAnimation ? "inactive3" : "text3"}>
              {" "}
              Let's count your{" "}
            </span>{" "}
            <br />
            <span className={letsSeeAnimation ? "inactive4" : "text4"}>
              {" "}
              new ambients!
            </span>
          </div>
        </div>
      ) : (
        <div className="overflow">
          {/* Finished Activity Part */}

          <div
            className={
              activityFinish ? "inactive_img" : "animation_page_img_container"
            }
          >
            <img src={LetsSeeImg} alt="lets see ambients" />
          </div>
          <div className="animation_page_text_container">
            <span className={activityFinish ? "inactive1" : "text1"}>
              {" "}
              This activity{" "}
            </span>{" "}
            <span className={activityFinish ? "inactive2" : "text2"}>
              {" "}
              has finished!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationPage;
