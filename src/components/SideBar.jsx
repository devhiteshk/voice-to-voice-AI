import { Box, ListItemText, MenuItem, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MicIcon from "@mui/icons-material/Mic";
import React, { useEffect } from "react";
import {
  retrieveChatsFromLocalStorage,
  saveChatToLocalStorage,
} from "../functions/Sessions";

export const SideBarComponent = ({
  smallOpen,
  setChatHistory,
  setCurrentChat,
  currentSessionId,
  setCurrentSessionId,
  setChatBotMessage,
  setUserMessage,
}) => {
  const [historyStorage, setHistoryStorage] = React.useState({});

  const handleCreateNewChat = () => {
    const newSessionId = `session_${new Date().getTime()}`;
    setCurrentSessionId(newSessionId);
    setChatHistory([]);
    setCurrentChat([]);
    setChatBotMessage("");
    setUserMessage("");
  };

  const handleSessionChange = (key, value) => {
    setCurrentSessionId(key);
    setChatHistory(value);
    setCurrentChat(value);
    setChatBotMessage("");
    setUserMessage("");
  };

  useEffect(() => {
    setHistoryStorage(retrieveChatsFromLocalStorage());
  }, [currentSessionId, window?.localStorage]);

  return (
    <Box
      sx={{
        display: {
          xs: smallOpen ? "initial" : "none",
          md: smallOpen ? "initial" : "initial",
        },
      }}
      zIndex={2}
      maxWidth={"260px"}
      overflow={"hidden"}
      position={"sticky"}
      top={0}
      height={"100vh"}
      width={"100%"}
      bgcolor={"#101418"}
    >
      <Box
        height={"72px"}
        p={"20px 20px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"10px"}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"50%"}
            sx={{ bgcolor: "#fff", width: "25px", height: "25px" }}
          >
            <MicIcon style={{ color: "red", fontSize: "20px" }} />
          </Box>
          <Typography variant="body1" fontWeight={500} color="#fff">
            New Chat
          </Typography>
        </Box>
        <Box>
          <Box
            onClick={handleCreateNewChat}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <DriveFileRenameOutlineIcon
              sx={{ cursor: "pointer" }}
              style={{ color: "#fff", fontSize: "20px" }}
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          p={"20px 20px 10px 20px"}
          variant="body2"
          fontWeight={"bold"}
          color="#fbf9f9"
        >
          Previous Conversations
        </Typography>

        {Object.entries(historyStorage)?.length > 0 ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"8px"}
            mt={"10px"}
          >
            {Object?.entries(historyStorage)?.map(([key, value]) => (
              <Box
                key={key}
                padding={"10px 20px"}
                onClick={() => handleSessionChange(key, value)}
                sx={{
                  cursor: "pointer",
                  ":hover": { backgroundColor: "grey.800" },
                }}
              >
                <Typography
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "220px",
                  }}
                  variant="body2"
                  color={"#fff"}
                >
                  {value?.[0]?.parts}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box padding={"10px 20px"}>
            <Typography variant="body2" color="#fff">
              ☹️ you haven't talked to me
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
