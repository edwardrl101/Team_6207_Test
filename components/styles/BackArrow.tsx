import { TouchableOpacity, Image, StyleSheet } from 'react-native'

export default function BackArrow() {
    return (
            <Image style = {styles.backArrow} source = {require('@/assets/images/back-arrow.png')}></Image>
    )
}

const styles = StyleSheet.create ({
    backArrow: {
        height: 30,
        width: 30,
        marginTop: 20,
        marginHorizontal: 10
      }
})