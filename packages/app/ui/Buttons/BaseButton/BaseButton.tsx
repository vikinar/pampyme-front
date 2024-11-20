import Icon from 'app/components/shared/Icon'
import { Pressable, SxProp, Text, View } from 'dripsy'
import { PressableProps as RNPressableProps } from 'react-native'

interface IProps extends RNPressableProps {
  disabled?: boolean
  onClick?: () => void
  text?: string
  sx?: SxProp // Корректное использование SxProp
}

export const BaseButton: React.FC<IProps> = ({
  disabled,
  onClick,
  text,
  sx,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      onPress={onClick}
      sx={{
        backgroundColor: '#2628dd',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        // maxWidth: '300',
        ...sx,
      }}
    >
      <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
        {/*<Icon name={'Check'} size={18} color="#ffffff" weight="bold" />*/}
        <Text
          sx={{
            fontFamily: 'Grapalat Regular',
            fontSize: 16,
            color: 'white',
            fontWeight: '500',
            paddingHorizontal: 5,
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  )
}
