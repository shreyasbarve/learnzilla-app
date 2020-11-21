// core
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Button,
  Icon,
  Content,
  Right,
  Spinner,
  Text,
} from "native-base";
import React, { useState, useEffect } from "react";
import { BackHandler, TouchableOpacity } from "react-native";
import storage from "@react-native-community/async-storage";

// components
import MyCard from "../../components/MyCard";

// api
import StudentApi from "../../api/StudentApi";

export default function Dashboard() {
  // navigation
  const navigation = useNavigation();

  let studentData = {
    email: "",
    key: "",
    user: "student",
  };

  // if get all classes display
  const [loading, setLoading] = useState(true);

  // get all classes
  const [allClass, setAllClass] = useState([]);
  const loadClasses = async () => {
    try {
      const values = await storage.multiGet(["smail", "skey"]);
      studentData.email = values[0][1];
      studentData.key = values[1][1];
      const res = await StudentApi.getClasses(studentData);
      setAllClass(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // if harware back button pressed
  const handleBack = async () => {
    storage.clear();
    await StudentApi.logout({ email: studentData.email, key: studentData.key });
    return true;
  };

  // logout
  const handleLogout = async () => {
    try {
      await storage.clear();
      await StudentApi.logout({
        email: studentData.email,
        key: studentData.key,
      });
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("sauth");
  };

  useEffect(() => {
    loadClasses();
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Container>
          <Spinner color="blue" />
        </Container>
      ) : (
        <Container>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left>
              <Button dark transparent onPress={handleLogout}>
                <Icon name="ios-exit" />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "#000" }}>Student Dashboard</Title>
            </Body>
          </Header>
          <Content>
            <TouchableOpacity onPress={() => navigation.navigate("sclass")}>
              {allClass.map((cData) => (
                <TouchableOpacity
                  key={cData.classroom_id}
                  onPress={async () => {
                    await storage.setItem(
                      "classid",
                      JSON.stringify(cData.classroom_id)
                    );
                    navigation.navigate("sclass");
                  }}
                >
                  <MyCard
                    key={cData.classroom_id}
                    id={cData.classroom_id}
                    std={cData.standard}
                    section={cData.section}
                    subject={cData.subject}
                    students={cData.teacher_name}
                  />
                </TouchableOpacity>
              ))}
            </TouchableOpacity>
          </Content>
        </Container>
      )}
    </>
  );
}
