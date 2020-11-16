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

// components
import MyCard from "../../components/MyCard";

// API
import TeacherApi from "../../models/teacher/TeacherApi";

export default function Dashboard() {
  // navigation
  const navigation = useNavigation();

  // if get all classes display
  const [loading, setLoading] = useState(true);

  // teacher login
  var teacherData = {
    email: "",
    name: "",
    user: "teacher", // user should be teacher
  };

  // get all classes
  const [allClass, setAllClass] = useState([]);
  const loadClasses = async () => {
    try {
      const { data } = await TeacherApi.getClasses(teacherData);
      setAllClass(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // add class
  const [addClass, setAddClass] = useState({
    teacher_email: "teachermail", // from login
    standard: "",
    section: "",
    subject: "",
    key: "teacherkey", // from login
  });
  const createClass = async () => {
    // try {
    //   await TeacherApi.createClass(addClass);
    //   loadClasses();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // if harware back button pressed
  const handleBack = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    // loadClasses();
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
    <>
      {/* {loading ? (
        <Container>
          <Spinner color="blue" />
        </Container>
      ) : (
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
      )} */}
      <Container>
        <Header>
          <Left>
            <Button transparent>
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
            <MyCard
              id={1}
              std={9}
              section={"B"}
              subject={"Maths"}
              students={56}
            />
            <MyCard
              id={1}
              std={9}
              section={"B"}
              subject={"Maths"}
              students={56}
            />
            <MyCard
              id={1}
              std={9}
              section={"B"}
              subject={"Maths"}
              students={56}
            />
          </TouchableOpacity>
        </Content>
      </Container>
    </>
  );
}
