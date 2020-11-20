// core
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
} from "react-native";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import storage from "@react-native-community/async-storage";

// api
import TeacherApi from "../../../api/TeacherApi";

// animations
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";

export default function Login() {
  // theme
  const { colors } = useTheme();

  // navigation
  const navigation = useNavigation();

  // data for login
  const [teacherData, setTeacherData] = useState({
    email: "",
    password: "",
  });

  const loginTeacher = async () => {
    console.log(teacherData);
    try {
      const { data: loginRes } = await TeacherApi.login(teacherData);
      const { data: detailsRes } = await TeacherApi.details({
        email: loginRes.email,
        key: loginRes.key,
      });
      await storage.multiSet([
        ["tmail", loginRes.email],
        ["tkey", loginRes.key],
        ["timail", detailsRes.institution_email],
        ["tname", detailsRes.name],
        ["tphone", detailsRes.phone_number],
      ]);
      navigation.navigate("thome");
    } catch (error) {
      console.log(error);
    }
  };

  // goback
  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome Back!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            value={teacherData.email}
            onChangeText={(e) => setTeacherData({ ...teacherData, email: e })}
          />
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            onChangeText={(e) =>
              setTeacherData({ ...teacherData, password: e })
            }
            value={teacherData.password}
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={loginTeacher}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                backgroundColor: "#009387",
                borderWidth: 1,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#FFFFFF",
                },
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            // onPress={loginTeacher}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity> */}
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
    width: "100%",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
