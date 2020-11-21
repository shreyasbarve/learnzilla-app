// core
import { useNavigation } from "@react-navigation/native";
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
} from "native-base";
import {
  ProgressBar,
  Colors,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { BackHandler, TouchableOpacity } from "react-native";
import storage from "@react-native-community/async-storage";

// api
import TeacherApi from "../../../api/TeacherApi";

export default function Students() {
  // navigation
  const navigation = useNavigation();

  // if get all students display
  const [loading, setLoading] = useState(true);

  // Dialog
  const [dialog, setDialog] = useState(false);
  const [dInfo, setDInfo] = useState({});

  // get students
  const [students, setStudents] = useState([]);
  const getStudents = async () => {
    try {
      const values = await storage.multiGet(["tmail", "tkey", "classid"]);
      studentData.teacher_email = values[0][1];
      studentData.classroom_id = values[1][1];
      studentData.key = values[2][1];
      const res = await TeacherApi.getStudents(
        { email: values[0][1], key: values[1][1] },
        values[2][1]
      );
      setStudents(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // add student
  let studentData = {
    teacher_email: "",
    classroom_id: "",
    student_email: "",
    key: "",
  };

  const addStudent = async () => {
    try {
      await TeacherApi.addStudent(studentData);
      getStudents();
    } catch (error) {
      console.log(error);
    }
  };

  // if harware back button pressed
  const handleBack = () => {
    navigation.navigate("thome");
    return true;
  };

  useEffect(() => {
    getStudents();
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Container>
          <ProgressBar indeterminate color={Colors.blue800} />
        </Container>
      ) : (
        <>
          <Portal>
            <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
              <Dialog.Title>{dInfo.student_name}'s Information</Dialog.Title>
              <Dialog.Content>
                <Paragraph>ID: {dInfo.student_id}</Paragraph>
                <Paragraph>Name: {dInfo.student_name}</Paragraph>
                <Paragraph>Email: {dInfo.student_email}</Paragraph>
                <Paragraph>Contact: {dInfo.student_phone_no}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button transparent onPress={() => setDialog(false)}>
                  <Text>Close</Text>
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <Container>
            <Header style={{ backgroundColor: "#fff" }}>
              <Left>
                <Button
                  dark
                  transparent
                  onPress={() => navigation.navigate("tdashboard")}
                >
                  <Icon name="md-arrow-round-back" />
                </Button>
              </Left>
              <Body>
                <Title style={{ color: "#000" }}>Students</Title>
              </Body>
              <Right>
                <Button transparent hasText>
                  <Text style={{ color: "#000" }}>Add Student</Text>
                </Button>
              </Right>
            </Header>
            <Content padder>
              <DataTable style={{ borderWidth: 0.5 }}>
                <DataTable.Header>
                  <DataTable.Title>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>ID</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                      NAME
                    </Text>
                  </DataTable.Title>
                </DataTable.Header>
                {students.map((sData) => (
                  <TouchableOpacity
                    onPress={() => {
                      setDInfo(sData);
                      setDialog(true);
                    }}
                  >
                    <DataTable.Row
                      style={{
                        padding: 20,
                        borderBottomWidth: 2,
                      }}
                    >
                      <DataTable.Cell>{sData.student_id}</DataTable.Cell>
                      <DataTable.Cell>{sData.student_name}</DataTable.Cell>
                    </DataTable.Row>
                  </TouchableOpacity>
                ))}
              </DataTable>
            </Content>
          </Container>
        </>
      )}
    </>
  );
}
