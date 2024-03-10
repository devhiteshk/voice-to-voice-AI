import React, { useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import { Box, Tooltip } from "@mui/material";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window?.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    if (u) {
      setUtterance(u);
      if (synth) {
        synth.speak(u);
        setIsPaused(true);
      }
    }
    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window?.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(true);
  };

//   const handlePause = () => {
//     const synth = window?.speechSynthesis;

//     synth.pause();

//     setIsPaused(true);
//   };

  const handleStop = () => {
    const synth = window?.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <Box ml={"-5px"}>
      <Tooltip title="Play">
        <PlayArrowIcon onClick={handlePlay} />
      </Tooltip>
      <Tooltip title="Stop">
        <StopIcon onClick={handleStop} />
      </Tooltip>
    </Box>
  );
};

export default TextToSpeech;
