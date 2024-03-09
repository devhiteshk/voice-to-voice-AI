import "./App.css";
import {
  Box,
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
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_REACT_GEMINI_KEY);

function App() {
  const [open, setOpen] = React.useState(false);
  const [micOn, setMicOn] = React.useState(false);
  const [inputPrompt, setInputPrompt] = React.useState("");
  const [chat, setChat] = React.useState([]);
  const [chatBotMessage, setChatBotMessage] = React.useState("");
  const [userMessage, setUserMessage] = React.useState("");
  const [isAPILoading, setIsAPILoading] = React.useState(false);

  const GeminiAPI = async (history, message) => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const prompt = message;
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  };

  const handleTextInput = async () => {
    setUserMessage(inputPrompt);
    setInputPrompt("");
    setIsAPILoading(true);
    let response = await GeminiAPI([], inputPrompt);
    setChat([
      ...chat,
      { role: "user", parts: inputPrompt },
      { role: "model", parts: response },
    ]);
    setChatBotMessage(response);
    setIsAPILoading(false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => console.log(chat, userMessage, chatBotMessage), [chat]);

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <SideBarComponent />
        <Box
          position={"relative"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          width={"100%"}
          maxHeight={"100vh"}
          height="100vh"
          bgcolor={"#1b1b32"}
          sx={{ overflowX: "hidden", overflowY: "scroll" }}
          flexDirection={"column"}
        >
          {/* NAVBAR */}
          <Box position={"sticky"} top={0} width={"100%"}>
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
              maxWidth={"xl"}
            >
              <NavBarSmall toggleDrawer={toggleDrawer} />
            </Box>
          </Box>
          <Box
            height={"100%"}
            minHeight={"calc(100%-120px)"}
            px={"20px"}
            width={"100%"}
            maxWidth={"md"}
          >
            <Chats
              isAPILoading={isAPILoading}
              chat={chat}
              userMessage={userMessage}
              chatBotMessage={chatBotMessage}
            />
          </Box>
          {/* Footer */}
          <Box
            position={"sticky"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bottom={0}
            zIndex={1}
            maxWidth={"md"}
            padding={"0px 20px 20px"}
            width={"100%"}
            bgcolor={"#1b1b32"}
          >
            <BInput
              multiline
              maxRows={5}
              fullWidth
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Box display={"flex"} alignItems={"center"} gap={"10px"}>
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

      <Drawer
        PaperProps={{ style: { maxWidth: "260px", width: "100%" } }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <SideBarComponent smallOpen={true} />
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
