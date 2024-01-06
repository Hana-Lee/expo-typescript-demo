import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'

interface EmojiPickerProps {
  isVisible: boolean
  onClose: () => void
  children?: React.ReactNode
}

export default function EmojiPicker({ isVisible, children, onClose }: EmojiPickerProps): React.ReactElement {
  return (
    <Modal animationType={'slide'} transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>이모티콘 선택</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name={'close'} size={22} color={'#fff'}/>
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464c55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
})