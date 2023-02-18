import React, { FC } from "react";
import { Alert, Modal, Pressable, View } from "react-native";
import { Text } from "../../Themed";
import { modalStyles } from "./modalStyles";

interface DownloadModalProps {
  modalVisible: boolean;
  setModalVisible: (_: boolean) => void;
  setFoo: (_: boolean) => void;
  artist: string;
  title?: string;
}

export const DownloadModal: FC<DownloadModalProps> = ({
  modalVisible,
  setModalVisible,
  setFoo,
  artist,
  title,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text>
            {artist} - {title}
          </Text>
          <View style={modalStyles.actions}>
            <Pressable
              style={[modalStyles.button, modalStyles.buttonOK]}
              onPress={() => {
                setFoo(true);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={modalStyles.textStyle}>(Re)download all</Text>
            </Pressable>
            <Pressable
              style={[modalStyles.button, modalStyles.buttonOK]}
              onPress={() => {
                setFoo(true);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={modalStyles.textStyle}>(Re)download</Text>
            </Pressable>
            <Pressable
              style={[modalStyles.button, modalStyles.buttonError]}
              onPress={() => {
                setFoo(false);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={modalStyles.textStyle}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
