import { Post } from 'post/types/post'
import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { Area } from 'shared/elements/field/area'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'
import styled from 'styled-components'
import { TransformBox } from 'shared/elements/box/transform'
import { useEffect, useRef, useState, useMemo, MutableRefObject } from 'react'
import { usePostEditor } from 'post/hooks/usePostEditor'
import { PostMarkdown } from './post-markdown'
import { Box } from 'shared/elements/box/common'
// import SimpleMde from "react-simplemde-editor";
import dynamic from "next/dynamic";
const SimpleMde = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";



export const PostEditor = (props: { post: Post; isPreview: boolean }) => {
  const { isPreview, uploadInfo, onInsertImgMarkdown } = usePostEditor()
  const { theme } = useTheme()
  const areaLeavePos = useRef(
    props.post.markdown ? props.post.markdown.length : 0
  )
  const areaRef = useRef() as MutableRefObject<HTMLDivElement>
  // マークダウンタブ追加
  const [, setMarkdown] = useState<string>(props.post.markdown ?? '')
  // const [markdown, setMarkdown] = useState(props.post.markdown ?? '')

  // 画像をアップロードする処理
  // const imageUploadFunction = (file) => {
  //   // 保存先の参照を作成
  //   const storage = firebase.storage();
  //   const storageRef = storage.ref(`images`);
  //   const imagesRef = storageRef.child(file.name);
  //   // 画像をアップロード
  //   const upLoadTask = imagesRef.put(file);
  //   // エラー処理や画像の保存が完了した後の処理
  //   upLoadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       console.log("snapshot", snapshot);
  //     },
  //     (error) => {
  //       console.log("エラーが発生しました", error);
  //     },
  //     () => {
  //       upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
  //         // アップロードしたURLを取得してマークダウンに埋め込む
  //         setMarkdown((preMardown) => {
  //           return preMardown + `![image](${downloadURL})`;
  //         });
  //       });
  //     });
  // };
  
  const editor = usePostEditor()
  // const imageUploadFunction = async (e) => {
    
  //                 const files = e.currentTarget.files
  //                 if (!files) return
  //                 if (files.length === 0) return
  //                 await editor.onUploadImage(files[0])
                
  // }
    const uploadImage = async (file: File) => {
        try {
            // 画像アップロード処理を実行
          editor.onUploadImage(file)
        } catch (error) {
        }
    }

    const handleDrop = (data, e) => {
        if (e.dataTransfer.files === undefined || e.dataTransfer.files.length === 0) {
            return;
        }

        const files = e.dataTransfer?.files;
        const file = files[0];

        if (
            file.type === "image/png" ||
            file.type === "image/jpeg" ||
            file.type === "image/heic" ||
            file.type === "image/gif"
        ) {
        const file = files[0];
            const uploadedImageUrl = uploadImage(file);
          // SimpleMde.replaceSelection("![](" + uploadedImageUrl + ")");
          // アップロードしたURLを取得してマークダウンに埋め込む
          setMarkdown((preMardown) => {
            return preMardown + `![image](${uploadedImageUrl})`;
          });
        }
    };

    const handlePaste = (data, e) => {
        if (e.clipboardData.files === undefined || e.clipboardData.files.length === 0) {
            return;
        }

        const files = e.clipboardData.files;
        const file = files[0];

        if (file.type === "image/png") {
            const uploadedImageUrl = uploadImage(file);
          // SimpleMde.codemirror.replaceSelection("![](" + uploadedImageUrl + ")");
          // アップロードしたURLを取得してマークダウンに埋め込む
          setMarkdown((preMardown) => {
            return preMardown + `![image](${uploadedImageUrl})`;
          });
        }
    };
  
  const toolbar = [
    '|',
    'undo',
    'redo',
    '|',
    'bold',
    'italic',
    'heading',
    'strikethrough',
    'code',
    '|',
    'quote',
    'unordered-list',
    'ordered-list',
    'table',
    'horizontal-rule',
    '|',
    'link',
]

  useEffect(() => {
    setMarkdown(props.post.markdown ?? '')
  }, [isPreview])

  useEffect(() => {
    // if (!props.post.markdown) return
    const newMarkdown = onInsertImgMarkdown(
      props.post.markdown ?? '',
      areaRef.current,
      areaLeavePos.current
    )
    props.post.markdown = newMarkdown
    setMarkdown(props.post.markdown)
  }, [uploadInfo])

  // // エディタの設定
  // const autoUploadImage = useMemo(() => {
  //   return {
  //     uploadImage: true,
  //     imageUploadFunction,
  //   };
  // }, []);

  return (
    <PostEditorBox background={theme.color.gray06}>
      <BorderBox
        width={'100%'}
        height={'100%'}
        borderPosition={'all'}
        borderColor={theme.color.gray05}
        borderWidth={'2px'}
        borderStyle={'solid'}
        radius={'12px'}
        overflow={'hidden'}
      >
        <ColorBox
          width={'100%'}
          height={'100%'}
          background={theme.color.base}
          position={'relative'}
        >
          <ColorBox
            width={'100%'}
            height={'100%'}
            padding={'0 4em'}
            position={'absolute'}
            opacity={isPreview ? 1 : 0}
            overflowY={isPreview ? 'scroll' : 'hidden'}
          >
            <TransformBox
              width={'100%'}
              height={'100%'}
              transform={isPreview ? 'translateY(0)' : 'translateY(1em)'}
            >
              <Box width={'100%'} padding={'2em 0 0 0'}>
                <PostMarkdown post={props.post} />
              </Box>
            </TransformBox>
          </ColorBox>
          <ColorBox
            width={'100%'}
            height={'100%'}
            padding={'0 4em'}
            position={'absolute'}
            opacity={isPreview ? 0 : 1}
            overflowY={isPreview ? 'hidden' : 'scroll'}
          >
            <TransformBox
              width={'100%'}
              height={'100%'}
              transform={isPreview ? 'translateY(1em)' : 'translateY(0)'}
            >
                <SimpleMde 
                  value={props.post.markdown ?? ''}
                  // onChange={(value) => {
                  //   setMarkdown(value);
                  // }}
                  onChange={(value) => (props.post.markdown = value)}
                  // options={autoUploadImage}
                  events={{ drop: handleDrop, paste: handlePaste }}
                ref={areaRef}
                options={{
                  toolbar: toolbar,
                  minHeight: "500px",
                  autofocus: true,
                  spellChecker: false,
                }}
                  />
            </TransformBox>
          </ColorBox>
        </ColorBox>
      </BorderBox>
    </PostEditorBox>
  )
}

const PostEditorBox = styled.div<{ background: string }>`
  width: 100%;
  height: 100%;
  padding: 2em;
  min-width: 40vw;
  border-radius: 15px;
  background: ${(props) => props.background};
  // border: solid 3px #131315;
  text-align: center;
  white-space: pre-wrap;
`
