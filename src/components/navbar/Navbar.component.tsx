import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenName from '../../screensName';
import { getAuthToken } from '../../helpers';
const iconSize = 33

export const Navbar = () => {
    const token = getAuthToken()
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: 'transparent',
                        opacity: pressed ? 0.9 : 1,
                        padding: 3,
                    },
                ]}
                onPress={() => {
                    navigation.navigate(!token ? ScreenName.Login : ScreenName.Lists)
                }}
            >
                <Ionicons
                    name="home"
                    size={iconSize}
                    color="rgba(0, 56, 83, 0.68)"
                />
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: 'transparent',
                        opacity: pressed ? 0.9 : 1,
                        padding: 3,
                    },
                ]}

                onPress={() => {
                    navigation.navigate(!token ? ScreenName.Login : ScreenName.UserProfile)
                }}
            >
                <Ionicons
                    name="person"
                    size={iconSize}
                    color="rgba(0, 56, 83, 0.68)"
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        borderTopWidth: 0.4,
        borderTopColor: 'rgba(0, 56, 83, 0.38)',
        paddingVertical: 3,
        paddingHorizontal: 3,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    wrapperustom: {},
})
