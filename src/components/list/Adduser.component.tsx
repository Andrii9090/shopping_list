import { View, Text, StyleSheet, Pressable } from "react-native"
import { CustomModal } from "../ui/CustomModal.component"
import React, { useState } from "react"
import { CustomInput } from "../ui/CustomInput.component"

type Props = {
    modalVisible: boolean
    setModalVisible: Function
    onSubmitHandler: (text: string) => void
}

export const AddUser = ({ modalVisible, setModalVisible, onSubmitHandler }: Props) => {
    const [code, setCode] = useState('')
    return (
        <CustomModal isVisible={modalVisible} setIsVisible={setModalVisible}>
            <View style={styles.modalView}>
                <View style={styles.centeredView}>
                    <Text style={styles.modalText}>To grant access to this list to other user enter his profile code</Text>
                    <CustomInput value={code} placeholder={'Profile code'} onChangeTextHandler={(text) => setCode(text)} />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => {
                                onSubmitHandler(code)
                                setCode('')
                                setModalVisible(!modalVisible)
                                }}>
                            <Text style={styles.textStyle}>Submit</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </CustomModal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 4,
        marginTop: 10
    },
    buttonOpen: {
        backgroundColor: 'rgb(0, 51, 133)',
    },
    buttonClose: {
        backgroundColor: 'rgb(245, 78, 41)',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 19
    },

    input: {
        height: 40,
        fontSize: 16,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});