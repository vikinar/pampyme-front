import { IconProps as PhosphorWebIconProps } from 'phosphor-react'
import { IconProps as PhosphorNativeIconProps } from 'phosphor-react-native'
import * as PhosphorNativeIcons from 'phosphor-react-native'
import React from 'react'

export type IconProps = PhosphorWebIconProps &
  PhosphorNativeIconProps & {
    name: string
  }

const Icon: React.FC<IconProps> = ({ name, size, color, weight, ...rest }) => {
  const NativeIcon = (PhosphorNativeIcons as any)[name]
  if (!NativeIcon) {
    console.warn(`Icon "${name}" does not exist in phosphor-react-native`)
    return null
  }
  return <NativeIcon size={size} color={color} weight={weight} {...rest} />
}

export default Icon
