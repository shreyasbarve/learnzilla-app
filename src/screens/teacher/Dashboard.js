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
  Text,
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

  // Dialog
  const [dialog, setDialog] = useState(false);

  let teacherData = {
    email: "",
    key: "",
    user: "teacher",
  };

  // if get all classes display
  const [loading, setLoading] = useState(true);

  // get all classes
  const [allClass, setAllClass] = useState([]);
  const loadClasses = async () => {
    try {
      const values = await storage.multiGet(["tmail", "tkey"]);
      teacherData.email = values[0][1];
      teacherData.key = values[1][1];
      addClass.teacher_email = values[0][1];
      addClass.key = values[1][1];
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
      setDialog(false);
      Toast.show({
        text: "Class created!",
        buttonText: "Okay",
        position: "top",
        type: "success",
      });
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
    try {
      await storage.clear();
      await TeacherApi.logout({
        email: teacherData.email,
        key: teacherData.key,
      });
    } catch (error) {
      console.log(error);
    }
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
          <ProgressBar indeterminate color={Colors.blue800} />
        </Container>
      ) : (
        <>
          <Portal>
            <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
              <Dialog.Title>Add Class</Dialog.Title>
              <Dialog.Content>
                <Form>
                  <TextInput
                    mode="outlined"
                    label="Standard"
                    value={addClass.standard}
                    onChangeText={(text) => setText(text)}
                  />
                  <TextInput
                    mode="outlined"
                    label="Section"
                    value={addClass.section}
                    onChangeText={(text) => setText(text)}
                  />
                  <TextInput
                    mode="outlined"
                    label="Subject"
                    value={addClass.subject}
                    onChangeText={(text) => setText(text)}
                  />
                </Form>
              </Dialog.Content>
              <Dialog.Actions>
                <Button transparent onPress={createClass}>
                  <Text>Add</Text>
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <Container>
            <Header style={{ backgroundColor: "#fff" }}>
              <Left>
                <Button dark transparent onPress={handleLogout}>
                  <Icon name="ios-exit" />
                </Button>
              </Left>
              <Body>
                <Title style={{ color: "#000" }}>Dashboard</Title>
              </Body>
              <Right>
                <Button transparent hasText onPress={() => setDialog(true)}>
                  <Text style={{ color: "#000" }}>Add Class</Text>
                </Button>
              </Right>
            </Header>
            <Content>
              {allClass.map((cData) => (
                <TouchableOpacity
                  key={cData.classroom_id}
                  onPress={async () => {
                    await storage.setItem(
                      "classid",
                      JSON.stringify(cData.classroom_id)
                    );
                    navigation.navigate("tclass");
                  }}
                >
                  <MyCard
                    id={cData.classroom_id}
                    std={cData.standard}
                    section={cData.section}
                    subject={cData.subject}
                    students={cData.strength}
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
