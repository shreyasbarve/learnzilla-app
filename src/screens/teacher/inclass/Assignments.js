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
import { BackHandler } from "react-native";
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
            <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
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
              {assignments.map((aData) => (
                <Card2
                  title={aData.title}
                  subtitle={aData.date.substring(0, 10)}
                  content={aData.assign_url}
                  isAction={true}
                />
              ))}
            </Content>
          </Container>
        </>
      )}
    </>
  );
}
