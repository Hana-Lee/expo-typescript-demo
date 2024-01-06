import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import React from 'react'

interface EmojiStickerProps {
  imageSize: number
  stickerSource: any
}

export default function EmojiSticker({ imageSize, stickerSource }: EmojiStickerProps): React.ReactElement {
  const scaleImage = useSharedValue(imageSize)
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2
      }
    })
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const drag = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX
      translateY.value += event.changeY
    })

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ]
    }
  })
  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image source={stickerSource} style={[imageStyle, { width: imageSize, height: imageSize }]} resizeMode={'contain'}/>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  )
}