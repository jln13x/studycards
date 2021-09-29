import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

interface MarkdownProps {
  markdown: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ markdown }) => {
  return (
    <ReactMarkdown
      plugins={[remarkGfm, remarkBreaks]}
      className="markdown-body"
    >
      {markdown}
    </ReactMarkdown>
  );
};
