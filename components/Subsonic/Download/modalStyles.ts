import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#121212",
    borderRadius: 4,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonOK: {
    backgroundColor: "#2196f3",
  },
  buttonError: {
    backgroundColor: "#aa0909",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
