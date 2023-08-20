import { GameMovie2air } from '../types/gameMovie2air'
import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { useTheme } from 'shared/hooks/useTheme'
import { TransformBox } from 'shared/elements/box/transform'
import { useEffect, useState, ReactNode } from 'react'
import styled from 'styled-components'
import { FlexBox } from 'shared/elements/box/flex'
import { Input } from 'shared/elements/field/input'
import { Word } from 'shared/elements/text/common'
import { moduler } from 'shared/utils/styles'
import { Calendar } from 'shared/elements/calendar/calendar'
import { Timestamp } from 'firebase/firestore'
import { CursorBox } from 'shared/elements/box/cursor'
import { Image } from 'shared/elements/image/common'
import { getDateText } from 'shared/utils/date'
import videojs from 'video.js';
import VideoPlayer from 'shared/elements/video/VideoPlayer'
import { Button } from 'shared/elements/button/common'
import saveGameMovie2air from '../utils/save'
import { errorList } from '../utils/error'
import { messageList } from '../utils/message'
import { schedule } from '../utils/schedule'
import { useNotification } from 'notification/hooks/useNotification'
import { useGameMovie2airEditor } from '../hooks/useGameMovie2airEditor'


export const GameMovie2airEditor = (props: {
  gameMovie2air: GameMovie2air
  isPreview: boolean
}) => {
  const { theme } = useTheme()
  const notifier = useNotification()

  const editor = useGameMovie2airEditor()

  // 試合日
  const [gameDate, setGameDate] = useState<Date>(
    props.gameMovie2air.gameDate
      ? props.gameMovie2air.gameDate.toDate()
      : truncateDate(new Date())
  )

  // カレンダー プレビュー領域
  const [isCalendarVisible, setCalendarVisible] = useState(false)

  useEffect(() => {
    props.gameMovie2air.gameDate = Timestamp.fromDate(gameDate)
  }, [gameDate, props.gameMovie2air])


  let videoJsOptions: videojs.PlayerOptions = {
    controls: true,
    muted: true,
    poster:"/img/video/GOAT-FC-Logo.png",
    sources: [{
      src: 'http://vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    }]
  };

  useEffect(() => {
    videoJsOptions = {
      poster:"/img/video/GOAT-FC-Logo.png",
      sources: [{
        src: props.gameMovie2air.videoUrlHighlight ,
        type: 'video/mp4'
      }]
    };
  }, [props.gameMovie2air.videoUrlHighlight])
  

  return (
    <GameMovie2airEditorBox background={theme.color.gray06}>
      <BorderBox
        width={'100%'}
        height={'100%'}
        borderPosition={'all'}
        borderColor={theme.color.gray05}
        borderWidth={'2px'}
        borderStyle={'solid'}
        radius={'12px'}
        overflow={'hidden'}
        minHeight={'1000px'}
      >
        <ColorBox
          width={'100%'}
          height={'100%'}
          background={theme.color.base}
          position={'relative'}
        >
          <ColorBox
            background={theme.color.gray06}
            width={'100%'}
            padding={'1em'}
            // radius={'16px'}
            shrink={'0'}
          >
            <ColorBox
              background={theme.color.gray06}
              width={'100%'}
              padding={'1em'}
              // radius={'16px'}
              shrink={'0'}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'タイトル'}>
                  <Input
                    width={'100%'}
                    padding={'1em 0.5em'}
                    background={theme.color.base}
                    border={{ radius: '6px' }}
                    defaultValue={props.gameMovie2air.title}
                    onChange={(e) => (props.gameMovie2air.title = e.target.value)}
                  />{' '}
                </TopField>
              </FlexBox>
            </ColorBox>
            
            <ColorBox
              background={theme.color.gray06}
              width={'100%'}
              padding={'1em'}
              // radius={'16px'}
              shrink={'0'}
            >
              <FlexBox way={'row'} width={'100%'} gap={'1em'}>
                <TopField title={'試合場所'}>
                  <Input
                    width={'100%'}
                    padding={'1em 0.5em'}
                    background={theme.color.base}
                    border={{ radius: '6px' }}
                    defaultValue={props.gameMovie2air.place}
                    onChange={(e) => (props.gameMovie2air.place = e.target.value)}
                  />{' '}
                </TopField>

                <TopField title={'試合日'}>
                  <ColorBox
                    position={'absolute'}
                    opacity={isCalendarVisible ? 1 : 0}
                  >
                    <TransformBox
                      position={'absolute'}
                      transform={
                        isCalendarVisible
                          ? 'translate(-110%, -50%)'
                          : 'translate(-105%, -50%)'
                      }
                    >
                      <Calendar
                        date={gameDate}
                        onChange={(d) => setGameDate(d)}
                        isUseTime={false}
                      />
                    </TransformBox>
                  </ColorBox>
                  <CursorBox cursor={'pointer'}>
                    <ColorBox
                      background={theme.color.base}
                      radius={'8px'}
                      padding={'0.75em 1em'}
                      onClick={() => setCalendarVisible(!isCalendarVisible)}
                    >
                      <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
                        <Image
                          width={'30px'}
                          height={'30px'}
                          src={'/calendar.png'}
                          fit={'contain'}
                        />
                        <Word size={moduler(-1)} weight={'600'}>{`${getDateText(
                          gameDate
                        )} `}</Word>
                      </FlexBox>
                    </ColorBox>
                  </CursorBox>
                </TopField>
              </FlexBox>
            </ColorBox>
            <ColorBox
              background={theme.color.gray06}
              width={'100%'}
              padding={'1em'}
              // radius={'16px'}
              shrink={'0'}
            >
              <FlexBox way={'row'} width={'100%'} gap={'1em'}>
                <TopField title={'自チーム'}>
                  <Input
                    width={'100%'}
                    padding={'1em 0.5em'}
                    background={theme.color.base}
                    border={{ radius: '6px' }}
                    defaultValue={props.gameMovie2air.myTeamName}
                    onChange={(e) =>
                      (props.gameMovie2air.myTeamName = e.target.value)
                    }
                  />{' '}
                </TopField>
                <TopField title={'対戦相手'}>
                  <Input
                    width={'100%'}
                    padding={'1em 0.5em'}
                    background={theme.color.base}
                    border={{ radius: '6px' }}
                    defaultValue={props.gameMovie2air.opponentName}
                    onChange={(e) =>
                      (props.gameMovie2air.opponentName = e.target.value)
                    }
                  />{' '}
                </TopField>
              </FlexBox>
            </ColorBox>
            <ColorBox
              background={theme.color.gray06}
              width={'100%'}
              padding={'1em'}
              // radius={'16px'}
              shrink={'0'}
            >
              <FlexBox way={'row'} width={'100%'} gap={'1em'}>
                <TopField title={'自チーム得点'}>
                  <Input
                    width={'100%'}
                    padding={'1em 0.5em'}
                    background={theme.color.base}
                    border={{ radius: '6px' }}
                    defaultValue={props.gameMovie2air.myTeamPoint}
                    onChange={(e) =>
                      (props.gameMovie2air.myTeamPoint = Number(e.target.value))
                    }
                  />{' '}
                </TopField>
                <TopField title={'対戦相手得点'}>
                  <Input
                    width={'100%'}
                    padding={'1em 0.5em'}
                    background={theme.color.base}
                    border={{ radius: '6px' }}
                    defaultValue={props.gameMovie2air.opponentPoint}
                    onChange={(e) =>
                      (props.gameMovie2air.opponentPoint = Number(e.target.value))
                    }
                  />{' '}
                </TopField>
              </FlexBox>
            </ColorBox>
          </ColorBox>



          <ColorBox
            background={theme.color.gray06}
            width={'100%'}
            padding={'1em'}
            // radius={'16px'}
            shrink={'0'}
          >
            
            <ColorBox
              background={theme.color.gray06}
              width={'100%'}
              padding={'1em'}
              // radius={'16px'}
              shrink={'0'}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'ハイライト動画URL'}>
                  <Input
                    width={'100%'}
                    padding={'1em 0.5em'}
                    background={theme.color.base}
                    border={{ radius: '6px' }}
                    defaultValue={props.gameMovie2air.fileNameHighlight}
                    disabled={true}
                    />
                    <FlexBox way={'row'} gap={'1em'}>
                      <label htmlFor={'md-image'}>
                        <input
                          id={'md-image'}
                          type={'file'}
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const answer = window.confirm('登録しますがよろしいですか？')
                            if (!answer) {
                              throw 'Abort route'
                            }
                            const files = e.currentTarget.files
                            if (!files) return
                            if (files.length === 0) return
                            props.gameMovie2air.fileNameHighlight = files[0].name;
                            const info = await editor.onUploadVideo(files[0])
                            props.gameMovie2air.videoUrlHighlight = info?info.url:"";
                          }}
                        />
                        <TransformBox hover={'scale(1.1)'}>
                          <ColorBox
                            width={'40px'}
                            height={'40px'}
                            radius={'20px'}
                            background={theme.color.base}
                          >
                            <FlexBox
                              way={'column'}
                              width={'40px'}
                              height={'40px'}
                              justifyContent={'center'}
                              alignItems={'center'}
                            >
                              <Image
                                width={'26px'}
                                height={'26px'}
                                src={'/image.svg'}
                                fit={'contain'}
                              />
                            </FlexBox>
                          </ColorBox>
                        </TransformBox>
                      </label>
                    </FlexBox>
                </TopField>

                <div className='w-full'>
                    <VideoPlayer {...videoJsOptions}/>
                  </div>
              </FlexBox>
            </ColorBox>

            <ColorBox
              background={theme.color.gray06}
              width={'100%'}
              padding={'1em'}
              // radius={'16px'}
              shrink={'0'}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'フル動画URL'}>
                  <Input
                    width={'100%'}
                    padding={'1em 0.5em'}
                    background={theme.color.base}
                    border={{ radius: '6px' }}
                    defaultValue={props.gameMovie2air.videoUrl}
                    onChange={(e) =>
                      (props.gameMovie2air.videoUrl = e.target.value)
                    }
                  />
                </TopField>
              </FlexBox>
            </ColorBox>

          </ColorBox>


        </ColorBox>
      </BorderBox>
    </GameMovie2airEditorBox>
  )
}

const GameMovie2airEditorBox = styled.div<{ background: string }>`
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
const TopField = (props: { title: string; children?: ReactNode }) => {
  const { theme } = useTheme()
  return (
    <FlexBox
      way={'row'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      position={'relative'}
    >
      <Word weight={'600'} size={moduler(-2)} color={theme.color.main}>
        {props.title}
      </Word>
      {props.children}
    </FlexBox>
  )
}

/**
 * 日付の時刻を切り捨てる(00:00:00にする)
 * @param date 対象日付
 */
const truncateDate = (date: Date): Date => {
  if (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }
  return date
}
