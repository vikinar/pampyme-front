import { IconProps as PhosphorWebIconProps } from 'phosphor-react'
import * as PhosphorWebIcons from 'phosphor-react'
import { IconProps as PhosphorNativeIconProps } from 'phosphor-react-native'
import * as PhosphorNativeIcons from 'phosphor-react-native'
import React from 'react'
import { Platform } from 'react-native'

export type IconProps = PhosphorWebIconProps &
  PhosphorNativeIconProps & {
    name: string
  }

const Icon: React.FC<IconProps> = ({ name, size, color, weight, ...rest }) => {
  const WebIcon = (PhosphorNativeIcons as any)[name]
  if (!WebIcon) {
    console.warn(`Icon "${name}" does not exist in phosphor-react`)
    return null
  }
  return <WebIcon size={size} color={color} weight={weight} {...rest} />
}

export default Icon
