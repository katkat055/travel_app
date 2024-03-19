import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questions: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    marginBottom: 10,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
  },
  btn: {
    backgroundColor: "gray",
    padding: 5,
    alignItems: "center",
  },
  underline: {
    textDecorationLine: "underline",
  },
  align: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  allpadding: {
    margin: 20
  }
});
