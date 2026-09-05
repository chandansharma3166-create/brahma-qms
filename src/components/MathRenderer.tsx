"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathRendererProps {
  content: string;
  className?: string;
}

export default function MathRenderer({ content, className = "" }: MathRendererProps) {
  const renderedHtml = useMemo(() => {
    if (!content) return "";

    // Split text by LaTeX delimiters ($...$ for inline, $$...$$ for block)
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]*?\$)/g;
    return content.replace(regex, (match) => {
      const isBlock = match.startsWith("$$");
      const formula = isBlock ? match.slice(2, -2) : match.slice(1, -1);
      try {
        return katex.renderToString(formula, {
          displayMode: isBlock,
          throwOnError: false,
        });
      } catch {
        return match;
      }
    });
  }, [content]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}