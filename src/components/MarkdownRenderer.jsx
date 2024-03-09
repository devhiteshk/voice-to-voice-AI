import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import style from "./MarkdownRenderer.module.css";
import {
  CodeBlock,
  CopyBlock,
  dracula,
  monokaiSublime,
} from "react-code-blocks";
import { Box } from "@mui/material";

export function MarkdownRenderer({ children: markdown }) {
  return (
    <Box position={"initial"}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className={style.reactMarkDown}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <>
                <CopyBlock
                  text={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  showLineNumbers={false}
                  wrapLongLines
                  theme={dracula}
                />
              </>
            ) : (
              <div {...props}>
                <CopyBlock
                  text={String(children).replace(/\n$/, "")}
                  showLineNumbers={false}
                  wrapLongLines
                  theme={dracula}
                />
              </div>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
    </Box>
  );
}
