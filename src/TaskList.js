import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'


export default function TaskList({ data, deleteItem, editItem }) {
    return (
        <View style={styles.container}>
            

            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => deleteItem(data.key)}>
                <Icon name='trash' color='#FF0000' size={20} />
            </TouchableOpacity>

            <View style={styles.areaTarefa} >
                <TouchableWithoutFeedback onPress={() => editItem(data)}>
                    <Text style={styles.txtTarefa}>{data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#778899',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5

    },
    areaTarefa: {
        paddingRight: 25,

    },
    txtTarefa: {
        paddingRight: 10,
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold'


    }
});