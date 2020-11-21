// core
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Header,
  Form,
  Item,
  Input,
  Label,
  Body,
  Title,
  Right,
  Button,
  Text,
  Icon,
  Thumbnail,
  Content,
} from "native-base";
import React, { useState } from "react";
import { BackHandler } from "react-native";

// api
import StudentApi from "../../../api/StudentApi";

export default function SignUp() {
  // navigation
  const navigation = useNavigation();

  // student data
  const [studentData, setStudentData] = useState({
    institution_email: "patna@gmail.com",
    email: "",
    name: "",
    phone_number: "",
    password: "",
  });

  // signup
  const signUpStudent = async () => {
    try {
      await StudentApi.register(studentData);
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("slogin");
  };

  return (
    <Container>
      <Header noLeft style={{ backgroundColor: "#fff" }}>
        <Body>
          <Title style={{ color: "#000" }}>Student SignUp</Title>
        </Body>
        <Right>
          <Button dark transparent iconLeft onPress={() => navigation.goBack()}>
            <Icon name="ios-exit" />
            <Text>Exit</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <Thumbnail
          large
          source={{
            uri:
              "https://www.vhv.rs/dpng/d/156-1566120_png-logo-for-student-transparent-png.png",
          }}
          style={{
            alignSelf: "center",
            marginTop: 30,
            height: 150,
            width: 150,
          }}
        />

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
            <Label>Full Name</Label>
            <Input
              keyboardType="default"
              value={studentData.name}
              onChangeText={(e) => setStudentData({ ...studentData, name: e })}
            />
          </Item>

          <Item stackedLabel>
            <Label>Email Address</Label>
            <Input
              keyboardType="email-address"
              value={studentData.email}
              onChangeText={(e) => setStudentData({ ...studentData, email: e })}
            />
          </Item>

          <Item stackedLabel>
            <Label>Mobile Number</Label>
            <Input
              keyboardType="phone-pad"
              value={studentData.phone_number}
              maxLength={10}
              onChangeText={(e) =>
                setStudentData({ ...studentData, phone_number: e })
              }
            />
          </Item>

          <Item stackedLabel>
            <Label>Password</Label>
            <Input
              keyboardType="default"
              secureTextEntry={true}
              value={studentData.password}
              onChangeText={(e) =>
                setStudentData({ ...studentData, password: e })
              }
            />
          </Item>

          <Button
            onPress={signUpStudent}
            rounded
            style={{ alignSelf: "center", marginTop: 40 }}
          >
            <Text>Sign Up</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
