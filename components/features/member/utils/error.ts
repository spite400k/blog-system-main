import { Notification } from 'components/notification/types/notification'

export const errorList = {
  same_slug_exist: <Notification>{
    emoji: '😵',
    code: 'member_same_slug_exist',
    message:
      '設定したスラッグは既に使用されています。他のスラッグを設定してください。',
    type: 'failed'
  },
  name_is_empty: <Notification>{
    emoji: '😵',
    code: 'member_name_is_empty',
    message: '選手の名前を1文字以上設定してください。',
    type: 'failed'
  },
  number_is_empty: <Notification>{
    emoji: '😵',
    code: 'member_number_is_empty',
    message: '背番号を1文字以上設定してください。',
    type: 'failed'
  },
  position_is_empty: <Notification>{
    emoji: '😵',
    code: 'member_number_is_empty',
    message: 'ポジションを1つ設定してください。',
    type: 'failed'
  },
  update_failed: <Notification>{
    emoji: '😵',
    code: 'member_update_failed',
    message:
      '投稿の保存中に予期せぬエラーが発生しました。時間を置いて再度お試しください。',
    type: 'failed'
  }
}
