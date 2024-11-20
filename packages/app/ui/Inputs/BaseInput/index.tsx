import ErrorMessage from 'app/ui/Inputs/ErrorMessage'
import { TextInput, useSx } from 'dripsy'
import { DripsyTextInputProps } from 'dripsy/build/core/components/TextInput'
import { FieldInputProps } from 'formik'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface InputProps extends FieldInputProps<string> {
  placeholder: string
  error?: string
  touched?: boolean
  inputMode?: DripsyTextInputProps['inputMode']
  secureTextEntry?: boolean
  autoComplete?: DripsyTextInputProps['autoComplete']
}

const BaseInput: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  inputMode = 'text',
  secureTextEntry = false,
  autoComplete = 'off',
}) => {
  const sx = useSx()

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        marginBottom: 8,
      }}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 0.7)"
        sx={{
          width: '100%',
          padding: 10,
          marginBottom: 5,
          borderWidth: 2,
          borderColor: touched && error ? 'red' : 'rgba(108, 122, 137, .8)',
          borderRadius: 8,
          fontFamily: 'Grapalat Regular',
          fontSize: 16,
        }}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
      />
      {touched && error && <ErrorMessage message={error} />}
    </TouchableOpacity>
  )
}

export default BaseInput
