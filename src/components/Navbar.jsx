import { Box, TextField, Typography, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MicIcon from "@mui/icons-material/Mic";
export const NavBarLarge = () => {
  return (
    <>
      <Box
        padding={"20px 30px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"5px"}
        width={"100%"}
        bgcolor={"#1b1b32"}
        zIndex={1}
      >
        <Typography
          variant="h6"
          color="#fff"
          fontWeight={600}
          fontStyle={"normal"}
        >
          VocinaAI
        </Typography>
        <MicIcon style={{ color: "red" }} />
      </Box>
    </>
  );
};

export const NavBarSmall = ({
  toggleDrawer,
  setCurrentSessionId,
  setChatHistory,
  setCurrentChat,
  setChatBotMessage,
  setUserMessage,
}) => {

  const handleCreateNewChat = () => {
    const newSessionId = `session_${new Date().getTime()}`;
    setCurrentSessionId(newSessionId);
    setChatHistory([]);
    setCurrentChat([]);
    setChatBotMessage("");
    setUserMessage("");
  };

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        bgcolor={"#1b1b32"}
        zIndex={1}
        p={"20px 20px"}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <MenuIcon
            sx={{ cursor: "pointer" }}
            style={{ color: "#fff" }}
            fontSize="medium"
            onClick={toggleDrawer(true)}
          />
        </Box>
        <Box
          sx={{ cursor: "pointer" }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"5px"}
        >
          <Typography
            variant="h6"
            color="#fff"
            fontWeight={600}
            fontStyle={"normal"}
          >
            VocinaAI
          </Typography>
          <MicIcon style={{ color: "red" }} />
        </Box>
        <Box onClick={handleCreateNewChat} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <DriveFileRenameOutlineIcon
            sx={{ cursor: "pointer" }}
            style={{ color: "#fff" }}
            fontSize="medium"
          />
        </Box>
      </Box>
    </Box>
  );
};
