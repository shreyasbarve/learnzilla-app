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
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { BackHandler, TouchableOpacity } from "react-native";
import storage from "@react-native-community/async-storage";

// api
import TeacherApi from "../../../api/TeacherApi";

// component
import Card2 from "../../../components/Card2";

export default function Assignments() {
  //navigation
  const navigation = useNavigation();

  // Dialog
  const [dialog, setDialog] = useState(false);
  const [dialog2, setDialog2] = useState(false);

  // if get all assignmets display
  const [loading, setLoading] = useState(true);

  // get assignments
  const [assignments, setAssignments] = useState([]);
  const getAssignments = async () => {
    try {
      const values = await storage.multiGet(["classid", "tmail", "tkey"]);
      assignmentData.classroom_id = values[0][1];
      assignmentData.teacher_email = values[1][1];
      assignmentData.key = values[2][1];
      marks.email = values[1][1];
      marks.key = values[2][1];
      const res = await TeacherApi.getAssignments(values[0][1]);
      setAssignments(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // add assignment
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    teacher_email: "",
    classroom_id: "",
    assign_url: "",
    key: "",
  });
  const createAssignment = async (e) => {
    e.preventDefault();
    try {
      await TeacherApi.createAssignment(assignmentData);
      getAssignments();
      setDialog(false);
      Toast.show({
        text: "Assignment created!",
        buttonText: "Okay",
        position: "top",
        type: "success",
      });
      setAssignmentData({ ...assignmentData, title: "", assign_url: "" });
    } catch (error) {
      Toast.show({
        text: "Assignment not created!",
        buttonText: "Okay",
        position: "top",
        type: "danger",
      });
      console.log(error);
    }
  };

  // add marks
  const [tempId, setTempId] = useState("");
  const [marks, setMarks] = useState({
    email: "",
    key: "",
    list: [],
  });
  const [studentData, setStudentData] = useState({
    assignment_id: "",
    student_id: "",
    marksobtain: "",
    totalmarks: "",
  });
  const updateMarks = async () => {
    try {
      await TeacherApi.addMarks(marks);
      Toast.show({
        text: "Marks updated!",
        buttonText: "Okay",
        position: "top",
        type: "danger",
      });
    } catch (error) {
      Toast.show({
        text: "Marks not updated!",
        buttonText: "Okay",
        position: "top",
        type: "danger",
      });
      console.log(error);
    }
    setStudentData({
      ...studentData,
      assignment_id: "",
      student_id: "",
      marksobtain: "",
      totalmarks: "",
    });
  };
  var finalMarks = [];
  const addStudentMarks = () => {
    const tempList = finalMarks.concat({
      assignment_id: tempId,
      student_id: studentData.student_id,
      marksobtain: studentData.marksobtain,
      totalmarks: studentData.totalmarks,
    });
    finalMarks = tempList;
    marks.list = finalMarks;
    setMarks(marks);
    setDialog2(false);
  };

  // if harware back button pressed
  const handleBack = () => {
    navigation.navigate("thome");
    return true;
  };

  useEffect(() => {
    getAssignments();
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
            <Dialog visible={dialog} onDismiss={() => setDialog2(false)}>
              <Dialog.Title>Create Assignment</Dialog.Title>
              <Dialog.Content>
                <Form>
                  <TextInput
                    mode="outlined"
                    label="Title"
                    value={assignmentData.title}
                    onChangeText={(e) =>
                      setAssignmentData({ ...assignmentData, title: e })
                    }
                  />
                  <TextInput
                    mode="outlined"
                    label="Assignment URL"
                    keyboardType="url"
                    value={assignmentData.assign_url}
                    onChangeText={(e) =>
                      setAssignmentData({ ...assignmentData, assign_url: e })
                    }
                  />
                </Form>
              </Dialog.Content>
              <Dialog.Actions>
                <Button transparent onPress={() => setDialog(false)}>
                  <Text>Cancel</Text>
                </Button>
                <Button transparent onPress={createAssignment}>
                  <Text>Create</Text>
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <Portal>
            <Dialog visible={dialog2} onDismiss={() => setDialog2(false)}>
              <Dialog.Title>Update marks</Dialog.Title>
              <Dialog.Content>
                <Form>
                  <TextInput
                    mode="outlined"
                    label="Student ID"
                    value={studentData.student_id}
                    onChangeText={(e) =>
                      setStudentData({ ...studentData, student_id: e })
                    }
                  />
                  <TextInput
                    mode="outlined"
                    label="Obtained marks"
                    value={studentData.marksobtain}
                    onChangeText={(e) =>
                      setStudentData({ ...studentData, marksobtain: e })
                    }
                  />
                  <TextInput
                    mode="outlined"
                    label="Total marks"
                    value={studentData.totalmarks}
                    onChangeText={(e) =>
                      setStudentData({ ...studentData, totalmarks: e })
                    }
                  />
                </Form>
              </Dialog.Content>
              <Dialog.Actions>
                <Button transparent onPress={() => setDialog2(false)}>
                  <Text>Cancel</Text>
                </Button>
                <Button transparent onPress={addStudentMarks}>
                  <Text>Create</Text>
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
                <Title style={{ color: "#000" }}>Assignments</Title>
              </Body>
              <Right>
                <Button transparent hasText onPress={() => setDialog(true)}>
                  <Text style={{ color: "#000" }}>Add</Text>
                </Button>
              </Right>
            </Header>
            <Content>
              <Button
                badge
                rounded
                hasText
                onPress={updateMarks}
                style={{ alignSelf: "center", marginTop: 10 }}
              >
                <Text style={{ color: "#fff" }}>Update Marks of Class</Text>
              </Button>
              {assignments.map((aData) => (
                <TouchableOpacity
                  onPress={() => {
                    setTempId(`${aData.id}`);
                    setDialog2(true);
                  }}
                >
                  <Card2
                    title={`${aData.id} - ${aData.title}`}
                    subtitle={aData.date.substring(0, 10)}
                    content={aData.assign_url}
                    isAction={true}
                  />
                </TouchableOpacity>
              ))}
            </Content>
          </Container>
        </>
      )}
    </>
  );
}
