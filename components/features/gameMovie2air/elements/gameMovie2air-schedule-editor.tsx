import { useEffect, useState } from 'react'
import { ColorBox } from 'shared/elements/box/color'
import { useTheme } from 'shared/hooks/useTheme'
import { Category } from 'category/types/category'
import { GameMovie2airScheduleItem } from './gameMovie2air-schedule-item'
import { TayoriSettings } from 'components/features/settings/types/settings'
import { KeyedMutator } from 'swr'

export const GameMovie2airScheduleEditor = (props: {
  settings: TayoriSettings
  categories: Category[]
  mutate: KeyedMutator<TayoriSettings[]>
}) => {
  const { theme } = useTheme()
  const [categories, setCategories] = useState(props.categories)

  useEffect(() => {
    setCategories(props.categories)
    props.categories.forEach((c) => {
      const isCategoryExist =
        props.settings.schedulesGameMovie2air.filter((s) => s.categoryId === c.id)
          .length > 0
      if (!isCategoryExist) {
        // add new schedule model if not exist
        props.settings.schedulesGameMovie2air.push({
          categoryId: c.id,
          endpoints: []
        })
      }
    })
  }, [props.categories])

  if (props.settings === null) {
    return (
      <ColorBox
        background={theme.color.base}
        radius={'12px'}
        overflow={'hidden'}
      ></ColorBox>
    )
  } else {
    return (
      <ColorBox
        background={theme.color.base}
        radius={'12px'}
        overflow={'hidden'}
      >
        {categories.map((c, i) => (
          <GameMovie2airScheduleItem
            key={i}
            settings={props.settings}
            category={c}
            mutate={props.mutate}
            isLast={i === categories.length - 1}
          />
        ))}
      </ColorBox>
    )
  }
}
