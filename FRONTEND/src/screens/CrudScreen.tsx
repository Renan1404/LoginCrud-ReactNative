import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Item {
  id: string;
  name: string;
}

export default function CrudScreen() {
  const navigation = useNavigation();
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const addItem = () => {
    if (!name) return;

    const newItem: Item = {
      id: Math.random().toString(),
      name,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setName('');
  };

  const updateItem = () => {
    if (!name || !editingItem) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editingItem.id ? { ...item, name } : item
      )
    );

    setEditingItem(null);
    setName('');
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const startEditing = (item: Item) => {
    setEditingItem(item);
    setName(item.name);
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      {editingItem ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={updateItem} style={styles.updateButton}>
            <Icon name="check" size={20} color="#fff" />
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelEditing} style={styles.cancelButton}>
            <Icon name="times" size={20} color="red" />
            <Text style={[styles.buttonText, { color: 'red' }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={addItem} style={styles.addButton}>
          <Icon name="plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.logoutLink}>
        <Icon name="sign-out" size={20} color="#6a0dad" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={styles.itemButtons}>
              <TouchableOpacity onPress={() => startEditing(item)}>
                <Icon name="edit" size={20} color="#6a0dad" style={styles.buttonIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <Icon name="trash" size={20} color="red" style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10002b', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', 
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
    borderRadius: 20, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'red',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  logoutLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutText: {
    color: '#6a0dad',
    fontSize: 18,
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
    color: '#fff', 
  },
  itemButtons: {
    flexDirection: 'row',
  },
  buttonIcon: {
    marginLeft: 15,
  },
});
