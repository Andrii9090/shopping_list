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
                        flex: 1,
                        alignItems: 'center',
                        paddingVertical: 5,
                    },
                ]}
                onPress={() => {
                    navigation.navigate(!token ? ScreenName.Login : ScreenName.Lists)
                }}
            >
                <Ionicons
                    name="home"
                    size={iconSize}
                    color="rgba(0, 51, 133, .8)"
                />
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: 'transparent',
                        opacity: pressed ? 0.9 : 1,
                        flex: 1, alignItems: 'center', paddingVertical: 5
                    },
                ]}

                onPress={() => {
                    navigation.navigate(!token ? ScreenName.Login : ScreenName.UserProfile)
                }}
            >
                <Ionicons
                    name="person"
                    size={iconSize}
                    color="rgba(0, 51, 133, .8)"
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopWidth: .5,
        borderTopColor: "rgba(171, 171, 171, 0.88)",
    },
    wrapperustom: {},
})
