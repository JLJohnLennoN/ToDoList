import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import firebase from './src/firebaseConnection';
import TaskList from './src/TaskList';

console.disableYellowBox = true;

export default function todoList() {

  const inputRef = useRef(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    async function loadTaks() {

      await firebase.database().ref('tarefas').on('value', (snapshot) => {
        setVisible(true);
        setTasks([]);

        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          };
          setTasks(oldArray => [...oldArray, data])
        })

      });
    }
    loadTaks();
    
  }, []);

  async function add() {
    if (newTask !== '') {
      if (key !== '') {
        await firebase.database().ref('tarefas').child(key).update({
          nome: newTask,
        });
        Keyboard.dismiss();
        setNewTask('');
        setKey('');
        return;
      }

      let tarefas = await firebase.database().ref('tarefas');
      let chave = tarefas.push().key;

      tarefas.child(chave).set({
        nome: newTask
      });
      Keyboard.dismiss();
      setNewTask('');
    }
  }
  async function deletar(key) {
    await firebase.database().ref('tarefas').child(key).remove();
  }
  function editar(data) {
    setNewTask(data.nome);
    setKey(data.key);
    inputRef.current.focus();
  }
  function cancelEdit() {
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }
  return (
    <View style={styles.container}>
      {key.length > 0 && (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={cancelEdit}>
            <Icon name='x-circle' size={20} color='#FF8C00' />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', marginLeft: 5, marginBottom: 1, color: '#FF8C00' }}>
            Editando - Clique no 'x' para cancelar.
            {/* <Icon name='x-circle' size={20} onPress={cancelEdit} /> */}
            
        </Text>
        </View>
      )}

      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          placeholder='O que tem para hoje?'
          underlineColorAndroid='transparent'
          onChangeText={(texto) => setNewTask(texto)}
          value={newTask}
          ref={inputRef} />
        <TouchableOpacity style={styles.btnAdd}
          onPress={add}>
          <Text style={styles.addTxt}>+</Text>
        </TouchableOpacity>
      </View>

      <ShimmerPlaceHolder
        style={{ height:40, width:'100%', margin: 2, borderRadius: 5}}
        autoRun={true}
        visible={visible}>
        <FlatList
          data={tasks}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <TaskList data={item} deleteItem={deletar} editItem={editar}/>
          )} />
      </ShimmerPlaceHolder>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10
  },
  viewInput: {
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    borderWidth: 0.3,
    marginBottom: 10,
    padding: 10,
    borderColor: '#778899',
    borderRadius: 20,
    height: 40,
    fontSize: 18
  },
  btnAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#778899',
    width: 40,
    height: 40,
    padding: 10,
    marginLeft: 5,
    borderRadius: 20
  },
  addTxt: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 2
  }
});