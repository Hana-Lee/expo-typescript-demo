import { StatusBar } from 'expo-status-bar'
import { Alert, ImageSourcePropType, StyleSheet, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useRef, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ImageViewer from './src/components/ImageViewer'
import EmojiSticker from './src/components/EmojiSticker'
import IconButton from './src/components/IconButton'
import CircleButton from './src/components/CircleButton'
import Button from './src/components/Button'
import EmojiPicker from '@/components/EmojiPicker'
import EmojiList from '@/components/EmojiList'

const PlaceHolderImageSource = require('@/assets/images/background-image.png') as ImageSourcePropType

export default function App() {
  const imageRef = useRef<any>()
  const [status, requestPermission] = MediaLibrary.usePermissions()
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showAppOptions, setShowAppOptions] = useState(false)

  if (status === null) {
    requestPermission()
  }

  const handleImageResult = (result: ImagePicker.ImagePickerResult): void => {
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      Alert.alert('사진을 선택 해주세요')
    }
  }

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    handleImageResult(result)
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      })

      await MediaLibrary.saveToLibraryAsync(localUri)
      if (localUri) {
        Alert.alert('저장되었습니다.')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeHolderImageSource={PlaceHolderImageSource} selectedImage={selectedImage}/>
          {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/> : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon={'refresh'} label={'다시 선택'} onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon={'save-alt'} label={'저장'} onPress={onSaveImageAsync}/>
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme={'primary'} label={'사진 선택'} /* @info */ onPress={pickImageAsync} /* @end *//>
          <Button label={'사진 사용'} onPress={() => setShowAppOptions(true)}/>
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
      <StatusBar style="light"/>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
