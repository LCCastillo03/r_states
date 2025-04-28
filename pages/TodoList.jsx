import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, Modal, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, IconButton } from "react-native-paper";  // <-- Importamos IconButton

export default function TodoList() {
  const [data, setData] = useState([{ id: 1, name: "Item 1" }]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedText, setEditedText] = useState("");

  const addItem = () => {
    const newItem = {
      id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
      name: `Item ${data.length + 1}`,
    };
    setData((prevData) => [...prevData, newItem]);
  };

  const deleteItem = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setEditedText(item.name);
    setModalVisible(true);
  };

  const saveEdit = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedItem.id ? { ...item, name: editedText } : item
      )
    );
    setModalVisible(false);
    setSelectedItem(null);
    setEditedText("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemText} onPress={() => openEditModal(item)}>
        {item.name}
      </Text>
      <IconButton
        icon="delete"       // Ícono de caneca
        size={24}
        onPress={() => deleteItem(item.id)}
        iconColor="red"
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
        />
        <FAB style={styles.fab} icon="plus" color="white" onPress={addItem} />
      </View>

      {/* Modal para editar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Editar Item</Text>
            <TextInput
              style={styles.input}
              value={editedText}
              onChangeText={setEditedText}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Guardar" onPress={saveEdit} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: "#ddd",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#6200ee",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
});
