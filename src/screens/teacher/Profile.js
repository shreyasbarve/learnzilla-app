// core
import {
  Container,
  Header,
  Form,
  Item,
  Input,
  Label,
  Body,
  Title,
  Left,
  Button,
  Text,
  Icon,
  Content,
} from "native-base";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import storage from "@react-native-community/async-storage";

// api
import TeacherApi from "../../api/TeacherApi";

export default function Profile() {
  // navigation
  const navigation = useNavigation();

  const setData = async () => {
    try {
      const values = await storage.multiGet(["tname", "tmail", "tkey"]);
      setTeacherData({
        ...teacherData,
        name: JSON.stringify(values[0][1]).substring(
          1,
          values[0][1].length + 1
        ),
        email: JSON.stringify(values[1][1]).substring(
          1,
          values[1][1].length + 1
        ),
        key: values[2][1],
      });
    } catch (error) {
      console.log(error);
    }
  };

  // change password
  let [teacherData, setTeacherData] = React.useState({
    name: "",
    email: "",
    password: "",
    newpass: "",
    key: "",
  });

  const changePassword = async () => {
    try {
      await TeacherApi.changePassword(teacherData, teacherData.name);
    } catch (error) {
      console.log(error);
    }
  };

  // if harware back button pressed
  const handleBack = () => {
    navigation.navigate("tdashboard");
    return true;
  };

  useEffect(() => {
    setData();
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
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
          <Title style={{ color: "#000" }}>Profile</Title>
        </Body>
      </Header>
      <Content>
        <Form
          style={{
            marginTop: 30,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 30,
            elevation: 3,
            borderStyle: "solid",
            padding: 20,
          }}
        >
          <Item stackedLabel>
            <Label>Name</Label>
            <Input disabled value={teacherData.name} />
          </Item>

          <Item stackedLabel>
            <Label>Email</Label>
            <Input disabled value={teacherData.email} />
          </Item>

          <Item stackedLabel>
            <Label>Old Password</Label>
            <Input
              secureTextEntry={true}
              value={teacherData.password}
              onChangeText={(e) =>
                setTeacherData({ ...teacherData, password: e })
              }
            />
          </Item>

          <Item stackedLabel>
            <Label>New Password</Label>
            <Input
              secureTextEntry={true}
              value={teacherData.newpass}
              onChangeText={(e) =>
                setTeacherData({ ...teacherData, newpass: e })
              }
            />
          </Item>

          <Button
            onPress={changePassword}
            rounded
            style={{ alignSelf: "center", marginTop: 40 }}
          >
            <Text>change Password</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
