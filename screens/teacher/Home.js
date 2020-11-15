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
} from "native-base";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";

// components
import MyCard from "../../components/MyCard";

// API
import TeacherApi from "../../models/teacher/TeacherApi";

export default function Home() {
  // navigation
  const navigation = useNavigation();

  // get all classes
  const [loading, setLoading] = useState(true);
  const [allClassesData, setAllClassesData] = useState([]);
  // const loadClasses = async () => {
  //   try {
  //     const res = await TeacherApi.allClasses();
  //     setAllClassesData(res.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const loadClasses = async () => {
    try {
      const res = await TeacherApi.class();
      setAllClassesData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // to add class
  var initialState = {
    email: "",
    standard: "",
    section: "",
    subject: "",
  };
  const [addClassData, setaddClassData] = useState(initialState);
  const addClass = () => {
    // add class function
  };

  useEffect(() => {
    loadClasses();
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
              <Button
                transparent
                iconLeft
                onPress={() => navigation.openDrawer()}
              >
                <Icon name="md-menu" />
              </Button>
            </Left>
            <Body>
              <Title>Home</Title>
            </Body>
            <Right>
              <Button transparent iconLeft onPress={addClass}>
                <Icon name="ios-add-circle" />
              </Button>
            </Right>
          </Header>
          <Content>
            {allClassesData.map((classData) => (
              <TouchableOpacity
                key={classData.id}
                onPress={() =>
                  navigation.navigate("InClass", { classId: classData.id })
                }
              >
                {/* <MyCard
                  key={classData.id}
                  id={classData.id}
                  std={classData.username}
                  section={classData.email}
                  subject={classData.phone}
                  students={classData.website}
                /> */}
                <MyCard
                  id={classData.id}
                  std={classData.title}
                  section={classData.date}
                  subject={classData.assign_url}
                  students={classData.classroom}
                />
              </TouchableOpacity>
            ))}
          </Content>
        </Container>
      )}
    </>
  );
}
