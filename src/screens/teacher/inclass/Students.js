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
  Form,
  Toast,
} from "native-base";
import {
  ProgressBar,
  Colors,
  Paragraph,
  Dialog,
  Portal,
  TextInput,
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
  const [dialog1, setDialog1] = useState(false);
  const [dInfo, setDInfo] = useState({});

  // get students
  const [students, setStudents] = useState([]);
  const getStudents = async () => {
    try {
      const values = await storage.multiGet(["tmail", "tkey", "classid"]);
      studentData.teacher_email = values[0][1];
      studentData.key = values[1][1];
      studentData.classroom_id = values[2][1];
      attendance.email = values[0][1];
      attendance.key = values[1][1];
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
  const [studentData, setStudentData] = useState({
    teacher_email: "",
    classroom_id: "",
    student_email: "",
    key: "",
  });
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await TeacherApi.addStudent(studentData);
      getStudents();
      setDialog1(false);
      Toast.show({
        text: "Student added!",
        buttonText: "Okay",
        position: "top",
        type: "success",
      });
    } catch (error) {
      Toast.show({
        text: "Student not added!",
        buttonText: "Okay",
        position: "top",
        type: "danger",
      });
      console.log(error);
    }
    setStudentData({ ...studentData, student_email: "" });
  };

  // add attendance
  const [attendance, setAttendance] = useState({
    email: "",
    key: "",
    list: [],
  });
  var finalList = [];
  const markPresent = (sid) => {
    const templist = finalList.concat({
      student_id: sid,
      classroom_id: studentData.classroom_id,
      attendance: 1,
    });

    finalList = templist;
    attendance.list = finalList;
    setAttendance(attendance);
  };
  const markAbsent = (sid) => {
    const templist = finalList.concat({
      student_id: sid,
      classroom_id: studentData.classroom_id,
      attendance: 0,
    });

    finalList = templist;
    attendance.list = finalList;
    setAttendance(attendance);
  };
  const markClass = async () => {
    try {
      await TeacherApi.addAttendance(attendance);
      Toast.show({
        text: "Attendance updated!",
        buttonText: "Okay",
        position: "top",
        type: "success",
      });
    } catch (error) {
      Toast.show({
        text: "Attendance not updated!",
        buttonText: "Okay",
        position: "top",
        type: "danger",
      });
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

          <Portal>
            <Dialog visible={dialog1} onDismiss={() => setDialog1(false)}>
              <Dialog.Title>Add Class</Dialog.Title>
              <Dialog.Content>
                <Form>
                  <TextInput
                    mode="outlined"
                    label="Student email"
                    keyboardType="email-address"
                    value={studentData.student_email}
                    onChangeText={(e) =>
                      setStudentData({ ...studentData, student_email: e })
                    }
                  />
                </Form>
              </Dialog.Content>
              <Dialog.Actions>
                <Button transparent onPress={() => setDialog1(false)}>
                  <Text>Cancel</Text>
                </Button>
                <Button transparent onPress={addStudent}>
                  <Text>Add</Text>
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
                <Button transparent hasText onPress={() => setDialog1(true)}>
                  <Text style={{ color: "#000" }}>Add Student</Text>
                </Button>
              </Right>
            </Header>
            <Content padder>
              <Button
                badge
                rounded
                hasText
                onPress={markClass}
                style={{ alignSelf: "center" }}
              >
                <Text style={{ color: "#fff" }}>
                  Update Attendance of class
                </Text>
              </Button>
              <DataTable style={{ borderWidth: 0.5, marginTop: 10 }}>
                <DataTable.Header>
                  <DataTable.Title>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>ID</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                      NAME
                    </Text>
                  </DataTable.Title>
                  <DataTable.Title>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      ATTENDANCE
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
                        padding: 10,
                        borderBottomWidth: 2,
                      }}
                    >
                      <DataTable.Cell>{sData.student_id}</DataTable.Cell>
                      <DataTable.Cell>{sData.student_name}</DataTable.Cell>
                      <DataTable.Cell>
                        <Button
                          badge
                          hasText
                          success
                          onPress={() => markPresent(sData.student_id)}
                        >
                          <Text style={{ color: "#fff" }}>P</Text>
                        </Button>
                        {"   "}
                        <Button
                          badge
                          hasText
                          danger
                          onPress={() => markAbsent(sData.student_id)}
                        >
                          <Text style={{ color: "#fff" }}>A</Text>
                        </Button>
                      </DataTable.Cell>
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
