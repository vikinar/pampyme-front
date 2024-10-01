import ErrorMessage from 'app/ui/Inputs/ErrorMessage'
import { TextInput, useSx } from 'dripsy'
import { DripsyTextInputProps } from 'dripsy/build/core/components/TextInput'
import { FieldInputProps } from 'formik'
import React from 'react'

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
    <>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 0.7)"
        sx={{
          width: '100%',
          padding: 12,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 4,
        }}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
      />
      {touched && error && <ErrorMessage message={error} />}
    </>
  )
}

export default BaseInput
