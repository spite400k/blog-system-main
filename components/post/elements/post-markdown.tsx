import { FC, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import MdImage from "./MdImage";

import { Post } from 'post/types/post'
import matter from 'gray-matter';
import { marked } from 'marked';

export const PostMarkdown = (props: { post: Post }) => {

    const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(`/articles/test.md`)
      .then((m) => {
        return m.text();
      })
      .then((md) => {
        setMarkdown(md);
      });
  }, []);

  const { data, content } = matter(props.post.markdown ?? '');
  return (
        <ReactMarkdown
          components={{
            code: CodeBlock,
            img: MdImage,
          }}
        >
          {content}
        </ReactMarkdown>
      );
  
}
