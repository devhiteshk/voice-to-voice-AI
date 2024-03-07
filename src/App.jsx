import "./App.css";
import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MicIcon from "@mui/icons-material/Mic";

function App() {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box
        sx={{ display: { xs: "none", md: "initial" } }}
        minHeight={"100vh"}
        maxWidth={"280px"}
        width={"100%"}
        bgcolor={"#101418"}
      >
        <Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ bgcolor: "#fff", width: "40px", height: "40px" }}
          >
            <MicIcon style={{ color: "red" }} />
          </Box>
          <Typography variant="body1" color="initial">
            New Chat
          </Typography>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        minHeight={"100vh"}
        bgcolor={"#1b1b32"}
      >
        {/* NAVBAR*/}
        <Box width={"100%"}>
          {/* NAVBAR LARGE SCREEN */}
          <Box
            width={"100%"}
            sx={{ display: { xs: "none", sm: "none", md: "initial" } }}
          >
            <Box
              padding={"10px 30px"}
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
          </Box>
          {/* NAVBAR SMALL SCREEN */}
          <Box
            sx={{ display: { xs: "initial", sm: "initial", md: "none" } }}
            width={"100%"}
            maxWidth={"xl"}
          >
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between" }}
                p={"10px 20px"}
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <MenuIcon
                    sx={{ cursor: "pointer" }}
                    style={{ color: "#fff" }}
                    fontSize="medium"
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
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <DriveFileRenameOutlineIcon
                    sx={{ cursor: "pointer" }}
                    style={{ color: "#fff" }}
                    fontSize="medium"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
