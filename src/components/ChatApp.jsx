import { Box } from "@mui/material";
import React from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";

function Chats({}) {
  let markdown =
    '```c++\n#include \u003ciostream\u003e\n\nint main() {\n  std::cout \u003c\u003c "Hello World!" \u003c\u003c std::endl;\n  return 0;\n}\n```';
  return (
    <Box width={"100%"} sx={{ color: "#fff" }}>
      <MarkdownRenderer>{markdown}</MarkdownRenderer>
    </Box>
  );
}

export default Chats;
