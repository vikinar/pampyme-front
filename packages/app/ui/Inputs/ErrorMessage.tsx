import { Text } from 'dripsy'
import React from 'react'

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => (
  <Text sx={{ color: 'red', marginBottom: 8 }}>{message}</Text>
)

export default ErrorMessage