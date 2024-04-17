import React, { ReactNode, ReactPortal } from 'react'
import {
    Modal,
    StyleSheet,
    View,
} from 'react-native'


type Props = {
    children?: ReactNode | ReactPortal | boolean | null | undefined
    isVisible: boolean
    setIsVisible: Function
}

export const CustomModal = ({ children, isVisible, setIsVisible }: Props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                setIsVisible()
            }}
        >
            <View style={styles.modalView}>
                    {children}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    btnModal: {
        padding: 10,
        borderRadius: 5,
    },
    btnModalText: { fontWeight: 'bold', fontSize: 16 },
})
