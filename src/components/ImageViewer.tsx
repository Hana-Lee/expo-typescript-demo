import { Image, ImageSourcePropType, StyleSheet } from 'react-native'
import React from 'react'

type ImageViewerProps = {
  placeHolderImageSource: ImageSourcePropType
  selectedImage: string | null
}

export default function ImageViewer({ placeHolderImageSource, selectedImage }: ImageViewerProps): React.ReactElement {
  const imageSource: ImageSourcePropType = selectedImage ? { uri: selectedImage } : placeHolderImageSource
  return (
    <Image source={imageSource} style={styles.image}/>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
})