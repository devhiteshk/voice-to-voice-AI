import { Box, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MicIcon from "@mui/icons-material/Mic";

export const SideBarComponent = (props) => {
  return (
    <Box
      sx={{
        display: {
          xs: props?.smallOpen ? "initial" : "none",
          md: props?.smallOpen ? "initial" : "initial",
        },
      }}
      zIndex={2}
      minHeight={"100vh"}
      maxWidth={"260px"}
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
          <Typography variant="body2" fontWeight={500} color="#fff">
            New Chat
          </Typography>
        </Box>
        <Box>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <DriveFileRenameOutlineIcon
              sx={{ cursor: "pointer" }}
              style={{ color: "#fff", fontSize: "20px" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
