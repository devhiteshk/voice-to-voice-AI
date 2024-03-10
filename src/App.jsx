import "./App.css";
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MicIcon from "@mui/icons-material/Mic";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { NavBarLarge, NavBarSmall } from "./components/Navbar";
import { SideBarComponent } from "./components/SideBar";
import PublishIcon from "@mui/icons-material/Publish";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Chats from "./components/ChatApp";
import { saveChatToLocalStorage } from "./functions/Sessions";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_REACT_GEMINI_KEY);

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

  const GeminiAPI = async (history, message) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const prompt = message;
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  };

  const handleTextInput = async () => {
    setCurrentChat(chatHistory);
    setUserMessage(inputPrompt);
    setInputPrompt("");
    setIsAPILoading(true);
    let response = await GeminiAPI(chatHistory, inputPrompt);
    setChatHistory([
      ...chatHistory,
      { role: "user", parts: inputPrompt },
      { role: "model", parts: response },
    ]);
    saveChatToLocalStorage(currentSessionId, [
      ...chatHistory,
      { role: "user", parts: inputPrompt },
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
  }, []);

  return (
    <>
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        <SideBarComponent
          setChatHistory={setChatHistory}
          setCurrentChat={setCurrentChat}
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
                              onClick={handleTextInput}
                              sx={{ color: "#fff", cursor: "pointer" }}
                            />
                          </InputAdornment>
                          <InputAdornment position="end">
                            {!micOn ? (
                              <Tooltip title="record">
                                <MicIcon
                                  onClick={() => setMicOn(true)}
                                  sx={{ color: "#fff", cursor: "pointer" }}
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip title="submit">
                                <FiberManualRecordIcon
                                  sx={{ color: "#ff5252", cursor: "pointer" }}
                                  onClick={() => setMicOn(false)}
                                />
                              </Tooltip>
                            )}
                          </InputAdornment>
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
