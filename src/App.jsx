import "./App.css";
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Tooltip,
  styled,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { NavBarLarge, NavBarSmall } from "./components/Navbar";
import { SideBarComponent } from "./components/SideBar";
import PublishIcon from "@mui/icons-material/Publish";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Chats from "./components/ChatApp";
import { saveChatToLocalStorage } from "./functions/Sessions";
import { GeminiAPI } from "./components/Gemini/GeminiAPI";
import SpeechRecognition, {
  useSpeechRecognition,
  resetTranscript,
} from "react-speech-recognition";

function App() {
  const [open, setOpen] = React.useState(false);
  const [micOn, setMicOn] = React.useState(false);
  const [inputPrompt, setInputPrompt] = React.useState("");
  const [chatBotMessage, setChatBotMessage] = React.useState("");
  const [userMessage, setUserMessage] = React.useState("");
  const [isAPILoading, setIsAPILoading] = React.useState(false);
  const [chatHistory, setChatHistory] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState([]);
  const [currentSessionId, setCurrentSessionId] = React.useState("");
  const [micFeature, setMicFeature] = React.useState(true);

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const handleMicOn = () => {
    setMicOn(true);
    SpeechRecognition.startListening({
      continuous: false,
      language: "en-IN",
    });
  };

  // console.log("debug", currentSessionId, transcript, inputPrompt);

  const handlePromptSubmit = async (submitType) => {
    setCurrentChat(chatHistory);
    let text = "";
    if (submitType === "text") {
      setUserMessage(inputPrompt);
      text = inputPrompt;
      setInputPrompt("");
    } else if (submitType === "audio") {
      setMicOn(false);
      SpeechRecognition.stopListening();
      setInputPrompt("");
      text = transcript;
      setUserMessage(text);
      SpeechRecognition.resetTranscript;
    }
    setIsAPILoading(true);
    let response = await GeminiAPI(chatHistory, text);
    setChatHistory([
      ...chatHistory,
      { role: "user", parts: text },
      { role: "model", parts: response },
    ]);
    saveChatToLocalStorage(currentSessionId, [
      ...chatHistory,
      { role: "user", parts: text },
      { role: "model", parts: response },
    ]);
    setChatBotMessage(response);
    setIsAPILoading(false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    const sessionId = `session_${new Date().getTime()}`;
    setCurrentSessionId(sessionId);
    !browserSupportsSpeechRecognition && setMicFeature(false);
  }, []);

  return (
    <>
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        <SideBarComponent
          setChatHistory={setChatHistory}
          setCurrentChat={setCurrentChat}
          chatHistory={chatHistory}
          currentSessionId={currentSessionId}
          setCurrentSessionId={setCurrentSessionId}
          setChatBotMessage={setChatBotMessage}
          setUserMessage={setUserMessage}
        />
        {/* NAVBAR */}
        <Box width={"100%"}>
          <Box position={"sticky"} zIndex={4} top={0} width={"100%"}>
            {/* NAVBAR LARGE SCREEN */}
            <Box
              width={"100vw"}
              sx={{ display: { xs: "none", sm: "none", md: "initial" } }}
            >
              <NavBarLarge />
            </Box>
            {/* NAVBAR SMALL SCREEN */}
            <Box
              sx={{ display: { xs: "initial", sm: "initial", md: "none" } }}
              width={"100%"}
            >
              <NavBarSmall
                toggleDrawer={toggleDrawer}
                setCurrentSessionId={setCurrentSessionId}
                setChatHistory={setChatHistory}
                setCurrentChat={setCurrentChat}
                setChatBotMessage={setChatBotMessage}
                setUserMessage={setUserMessage}
              />
            </Box>
          </Box>

          <Chats
            isAPILoading={isAPILoading}
            chat={currentChat}
            userMessage={userMessage}
            chatBotMessage={chatBotMessage}
          />

          {/* Footer */}
          <Box
            position={"sticky"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"flex-end"}
            bottom={0}
            zIndex={1}
            width={"100%"}
            padding={"0px 20px 20px"}
            bgcolor={"#1b1b32"}
          >
            <Box maxWidth={"md"} width={"100%"}>
              <BInput
                multiline
                maxRows={5}
                fullWidth
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      {isAPILoading ? (
                        <CircularProgress size={"24px"} />
                      ) : (
                        <>
                          <InputAdornment position="end">
                            <PublishIcon
                              onClick={() => handlePromptSubmit("text")}
                              sx={{ color: "#fff", cursor: "pointer" }}
                            />
                          </InputAdornment>
                          {micFeature && (
                            <InputAdornment position="end">
                              {!micOn ? (
                                <Tooltip title="record">
                                  <MicIcon
                                    onClick={handleMicOn}
                                    sx={{ color: "#fff", cursor: "pointer" }}
                                  />
                                </Tooltip>
                              ) : (
                                <Tooltip title="submit">
                                  <FiberManualRecordIcon
                                    sx={{ color: "#ff5252", cursor: "pointer" }}
                                    onClick={() => handlePromptSubmit("audio")}
                                  />
                                </Tooltip>
                              )}
                            </InputAdornment>
                          )}
                        </>
                      )}
                    </Box>
                  ),
                  sx: {
                    borderRadius: "15px",
                    color: "#fff",
                    fontSize: "16px",
                  },
                }}
                hiddenLabel
                id="filled-hidden-label-normal"
                placeholder="Message to AI..."
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Drawer
        PaperProps={{
          style: { maxWidth: "260px", width: "100%", height: "100%" },
        }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <SideBarComponent
          smallOpen={true}
          setChatHistory={setChatHistory}
          chatHistory={chatHistory}
          setCurrentChat={setCurrentChat}
          currentSessionId={currentSessionId}
          setCurrentSessionId={setCurrentSessionId}
          setChatBotMessage={setChatBotMessage}
          setUserMessage={setUserMessage}
        />
      </Drawer>
    </>
  );
}

export default App;

const BInput = styled(TextField)({
  "& label.Mui-focused": {
    color: "#e0e0e0",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#e0e0e0",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: "#e0e0e0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e0e0e0",
    },
  },
});
