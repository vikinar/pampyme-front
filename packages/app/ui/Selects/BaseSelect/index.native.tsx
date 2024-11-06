import { Text, View } from 'dripsy'
import React, { useState } from 'react'
import { Button, Modal, Platform, TouchableOpacity } from 'react-native'

import { Picker } from '@react-native-picker/picker'

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
}) => {
  const [tempValue, setTempValue] = useState(selectedValue)
  const [isModalVisible, setModalVisible] = useState(false)

  const confirmSelection = () => {
    onValueChange(tempValue) // Update the selected value
    setModalVisible(false)
  }

  return (
    <View sx={{ marginY: 2 }}>
      {label && <Text sx={{ marginBottom: 1 }}>{label}</Text>}

      {Platform.OS === 'ios' ? (
        <>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View
              style={{
                padding: 10,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
              }}
            >
              <Text>
                {options.find((opt) => opt.value === selectedValue)?.label ||
                  'Select'}
              </Text>
            </View>
          </TouchableOpacity>

          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 16,
                }}
              >
                <Text style={{ fontSize: 18, marginBottom: 12 }}>
                  Select Language
                </Text>
                <Picker
                  selectedValue={tempValue}
                  onValueChange={(value) => setTempValue(value)}
                >
                  {options.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
                <Button title="Done" onPress={confirmSelection} />
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={{
            width: '100%',
            backgroundColor: 'white',
            paddingRight: 30,
          }}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      )}
    </View>
  )
}
