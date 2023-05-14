import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  ScrollView,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";


export default function Loading({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.title}>
        <Text style={styles.titleText}>Vintage Ping Pong</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleText: {
    color: "#91B391",
    fontSize: 40,
    fontWeight: "600",
  },

  footer: {
    marginBottom: 30,
    alignItems: "center",
  },

  login: {
    backgroundColor: "#91B391",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 25,
  },

  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  signUpText: {
    textDecorationLine: "underline",
    marginTop: 10,
  },
});