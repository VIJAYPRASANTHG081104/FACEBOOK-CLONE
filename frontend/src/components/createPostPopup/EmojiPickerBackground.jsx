import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

const EmojiPickerBackground = ({
  user,
  text,
  setText,
  type2,
  setbackground,
  background
}) => {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [showBgs, setShowBgs] = useState(false);
  const bgRef = useRef(null);

  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + e.emoji + end;
    setText(newText);
    setCursorPosition(start.length + e.emoji.length);
  };
  const postBackground = [
    "../../../public/images/postBackgrounds/1.jpg",
    "../../../public/images/postBackgrounds/2.jpg",
    "../../../public/images/postBackgrounds/3.jpg",
    "../../../public/images/postBackgrounds/4.jpg",
    "../../../public/images/postBackgrounds/5.jpg",
    "../../../public/images/postBackgrounds/6.jpg",
    "../../../public/images/postBackgrounds/7.jpg",
    "../../../public/images/postBackgrounds/8.jpg",
    "../../../public/images/postBackgrounds/9.jpg",
  ];
  const backGroundhandler = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackground[i]})`;
    setbackground(postBackground[i]);
    bgRef.current.classList.add("bgHandler")
  };
  const removebg = () =>{
    bgRef.current.style.backgroundImage="";
    setbackground("");
    bgRef.current.classList.remove("bgHandler")

  }
  return (
    <div className={`${type2 && "images_input"}`}>
      <div className={`${!type2 && "flex_center"}`} ref={bgRef}>
        <textarea
          ref={textRef}
          maxLength="250"
          value={text}
          placeholder={`What's on your mind, ${user.first_name}`}
          className={`post_input ${type2 && "input2"}`}
          onChange={(e) => setText(e.target.value)}
          style={{paddingTop:`${background?Math.abs(textRef.current.value.length * 0.1-30):"0"}%`}}
        ></textarea>
      </div>
      <div className={`${!type2 && "post_emojis_wrap"}`}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => setShowBgs((pre) => !pre)}
          />
        )}
        {!type2 && showBgs && (
          <div className="post_backgrounds">
            <div className="no_bg" onClick={()=>removebg()}></div>
            {postBackground.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=""
                onClick={() => backGroundhandler(i)}
              />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 && "moveleft"}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
};

export default EmojiPickerBackground;
