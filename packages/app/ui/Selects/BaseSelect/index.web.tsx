import { Text, View } from 'dripsy'
import React from 'react'

interface Option {
  label: string
  value: string
}

interface CustomSelectProps {
  options: Option[]
  selectedValue: string
  onValueChange: (value: string) => void
  label?: string
}

export const BaseSelect: React.FC<CustomSelectProps> = ({
  options,
  selectedValue,
  onValueChange,
  label,
}) => (
  <View sx={{ marginY: 2 }}>
    {label && <Text sx={{ marginBottom: 1 }}>{label}</Text>}
    <select
      key={selectedValue} // Add a key here based on the selected value or language
      value={selectedValue}
      onChange={(e) => onValueChange(e.target.value)}
      style={{
        padding: 8,
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </View>
)
