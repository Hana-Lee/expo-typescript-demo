import { FlatList, Image, Platform, Pressable, StyleSheet } from 'react-native'
import { ListRenderItemInfo } from '@react-native/virtualized-lists/Lists/VirtualizedList'
import React from 'react'

interface EmojiListProps {
  onSelect: (item: any) => void
  onCloseModal: () => void
}

const EMOJI_IMAGES = [
  require('../assets/images/emoji1.png'),
  require('../assets/images/emoji2.png'),
  require('../assets/images/emoji3.png'),
  require('../assets/images/emoji4.png'),
  require('../assets/images/emoji5.png'),
  require('../assets/images/emoji6.png'),
]

export default function EmojiList({ onSelect, onCloseModal }: EmojiListProps): React.ReactElement {
  const renderListItem = ({ item, index }: ListRenderItemInfo<any>) => (
    <Pressable onPress={() => {
      onSelect(item)
      onCloseModal()
    }}>
      <Image source={item} key={index} style={styles.image}/>
    </Pressable>
  )

  return (
    <FlatList
      data={EMOJI_IMAGES}
      renderItem={renderListItem}
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      contentContainerStyle={styles.listContainer}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
})