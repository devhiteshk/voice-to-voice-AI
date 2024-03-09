import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";

function Chats({ isAPILoading, chat, userMessage, chatBotMessage }) {
  console.log(chat, isAPILoading, userMessage, chatBotMessage);
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
        width={"100%"}
        sx={{ color: "#fff" }}
      >
        {chat?.map((item, index) => (
          <Box
            key={index}
            display={"flex"}
            alignItems={"flex-start"}
            gap={"10px"}
          >
            <Box>
              <Box
                sx={{
                  width: "24px",
                  borderRadius: "50%",
                  height: "24px",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    item?.role === "user" ? "#ff5722" : "#00c853",
                  fontSize: "12px",
                }}
              >
                {item?.role === "user" ? "You" : "AI"}
              </Box>
            </Box>
            <Box width={"100%"}>
              <MarkdownRenderer>{item?.parts}</MarkdownRenderer>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Chats;
