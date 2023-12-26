import { useState } from 'react'
import { useTheme } from 'shared/hooks/useTheme'
import { BorderBox } from '../box/border'
import { ColorBox } from '../box/color'
import { FlexBox } from '../box/flex'
import Select from 'react-select'

export const SelectBox = (props: {
  values: { value: string; label: string }[]
  defaultValue: { value: string; label: string }
  onChange: (item: string) => void
}) => {
  const { theme } = useTheme()

  const [value, setValue] = useState(props.defaultValue)
  const handleChange = (e: any) => {
    setValue(e ? e.value : '')
    props.onChange(e ? e.value : '')
  }
  console.log(value)

  return (
    <FlexBox way={'column'} width={'100%'} gap={'6px'}>
      <ColorBox
        width={'100%'}
        background={theme.color.base}
        radius={'10px'}
        padding={'16px 8px'}
        hover={{
          background: theme.color.gray06
        }}
      >
        <BorderBox
          width={'100%'}
          borderPosition={'bottom'}
          borderWidth={'0px'}
          borderColor={theme.color.gray05}
          borderStyle={'solid'}
        >
          <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
            <Select
              options={props.values}
              defaultValue={{
                label: props.defaultValue.label,
                value: props.defaultValue.value
              }}
              onChange={(e) => handleChange(e)}
            />
          </FlexBox>
        </BorderBox>
      </ColorBox>
    </FlexBox>
  )
}
