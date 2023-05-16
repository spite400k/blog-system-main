// import { gen } from 'middle'
import { Post } from 'post/types/post'
import matter from 'gray-matter';
import { marked } from 'marked';

export const PostMarkdown = (props: { post: Post }) => {
  // console.log(tokens)
  // const elements = gen(props.post.markdown ?? '', {
  //   img: 'md-img',
  //   p: 'md-p',
  //   a: 'md-a',
  //   blockquote: 'md-bq',
  //   pre: 'md-pre',
  //   code: 'tokyo-night-dark'
  // })
      console.log('props.post.markdown:', props.post.markdown);
  const { data, content } = matter(props.post.markdown ?? '');
  return <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
}
