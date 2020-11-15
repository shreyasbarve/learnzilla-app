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

  // if get all classes display
  const [loading, setLoading] = useState(true);

  // teacher login
  const USER = "teacher";
  var teacherData = {
    email: "", // change this
    name: "", // change this
    use: USER, // user should be teacher
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
          </Content>
        </Container>
      )}
    </>
  );
}
