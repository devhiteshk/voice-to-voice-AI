import "./App.css";
import { Box, TextField, Typography, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MicIcon from "@mui/icons-material/Mic";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { NavBarLarge, NavBarSmall } from "./components/Navbar";
import { SideBarComponent } from "./components/SideBar";

function App() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <SideBarComponent />
        <Box
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
          {/* Footer */}
          <Box
            position={"fixed"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bottom={0}
            zIndex={1}
            width={"100%"}
            p={"20px 40px"}
            maxWidth={"md"}
            bgcolor={"#1b1b32"}
          >
            <BInput
              multiline
              dir="up"
              maxRows={5}
              InputProps={{
                sx: {
                  borderRadius: "15px",
                  color: "#fff",
                  fontSize: "14px",
                },
              }}
              sx={{
                minWidth: "280px",
                maxWidth: "700px",
                width: "100%",
              }}
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Message to AI..."
              variant="outlined"
            />
          </Box>
          {/* CHAT BOT CONTENT */}
          <Box display={"flex"} justifyContent={"center"} width={"100%"}>
            <Box maxWidth={"md"} width="100%" padding={"10px 20px"}>
              <Typography variant="h1" color="#fff">
                Hello
              </Typography>
              <Typography variant="h1" color="#fff">
                Hello
              </Typography>
              <Typography variant="h1" color="#fff">
                Hello
              </Typography>
              <Typography variant="h1" color="#fff">
                Hello
              </Typography>
              <Typography variant="h1" color="#fff">
                Hello
              </Typography>
              <Typography variant="h1" color="#fff">
                Hello
              </Typography>
              <Typography variant="h1" color="#fff">
                Hello
              </Typography>
              <Typography variant="h1" color="#fff">
                Hello
              </Typography>
              <Typography variant="h1" color="#fff">
                Hello
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Drawer
        PaperProps={{ style: { maxWidth: "280px", width: "100%" } }}
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
