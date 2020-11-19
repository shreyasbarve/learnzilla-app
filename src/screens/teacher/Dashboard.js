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
import TeacherApi from "../../api/TeacherApi";

export default function Dashboard() {
  // navigation
  const navigation = useNavigation();

  // if get all classes display
  const [loading, setLoading] = useState(true);

  // teacher data
  const [teacherData, setTeacherData] = useState({
    email: "",
    key: "",
    user: "teacher", // user should be teacher
  });

  // get all classes
  const [allClass, setAllClass] = useState([]);
  const loadClasses = async () => {
    const values = await storage.multiGet(["tmail", "tkey"]);
    const tmail = values[0][1];
    const tkey = values[1][1];
    console.log(tmail, tkey);
    setTeacherData({ ...teacherData, email: tmail, key: tkey });

    console.log(teacherData);
    try {
      const res = await TeacherApi.getClasses(teacherData);
      setAllClass(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // add class
  const [addClass, setAddClass] = useState({
    teacher_email: "",
    standard: "",
    section: "",
    subject: "",
    key: "",
  });
  const createClass = async (e) => {
    e.preventDefault();
    try {
      await TeacherApi.createClass(addClass);
    } catch (error) {
      console.log(error);
    }
  };

  // if harware back button pressed
  const handleBack = async () => {
    storage.clear();
    await TeacherApi.logout({ email: teacherData.email, key: teacherData.key });
    return true;
  };

  // logout
  const handleLogout = async () => {
    storage.clear();
    await TeacherApi.logout({ email: teacherData.email, key: teacherData.key });
    navigation.navigate("tauth");
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
          <Header>
            <Left>
              <Button transparent onPress={handleLogout}>
                <Icon name="ios-exit" />
              </Button>
            </Left>
            <Body>
              <Title>Dashboard</Title>
            </Body>
            <Right>
              <Button transparent hasText onPress={createClass}>
                <Text>Add Class</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <TouchableOpacity onPress={() => navigation.navigate("tclass")}>
              {allClass.map((classData) => (
                <TouchableOpacity
                  key={classData.classroom_id}
                  onPress={() =>
                    navigation.navigate("InClass", {
                      classId: classData.classroom_id,
                    })
                  }
                >
                  <MyCard
                    key={classData.classroom_id}
                    id={classData.classroom_id}
                    std={classData.standard}
                    section={classData.section}
                    subject={classData.subject}
                    students={classData.strength}
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
