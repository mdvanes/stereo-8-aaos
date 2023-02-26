import { MaterialIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Alert, Modal, Pressable, View } from "react-native";
import { Text } from "../../Themed";
import { modalStyles } from "./modalStyles";

interface DownloadModalProps {
  modalVisible: boolean;
  setModalVisible: (_: boolean) => void;
  setIsOffline: (_: boolean) => void;
  artist: string;
  title?: string;
}

export const DownloadModal: FC<DownloadModalProps> = ({
  modalVisible,
  setModalVisible,
  setIsOffline,
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
                setIsOffline(true);
                setModalVisible(!modalVisible);
              }}
            >
              <MaterialIcons name="cloud-download" size={30} color="white" />
              <Text style={modalStyles.textStyle}>(Re)download all</Text>
            </Pressable>
            <Pressable
              style={[modalStyles.button, modalStyles.buttonOK]}
              onPress={() => {
                setIsOffline(true);
                setModalVisible(!modalVisible);
              }}
            >
              <MaterialIcons name="file-download" size={30} color="white" />
              <Text style={modalStyles.textStyle}>(Re)download</Text>
            </Pressable>
            <Pressable
              style={[modalStyles.button, modalStyles.buttonError]}
              onPress={() => {
                setIsOffline(false);
                setModalVisible(!modalVisible);
              }}
            >
              <MaterialIcons
                name="restore-from-trash"
                size={30}
                color="white"
              />
              <Text style={modalStyles.textStyle}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
