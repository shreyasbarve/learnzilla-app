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
import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import storage from "@react-native-community/async-storage";
import { DataTable } from "react-native-paper";

// api
import StudentApi from "../../../api/StudentApi";

export default function Attendance() {
  // navigation
  const navigation = useNavigation();

  // get attendance
  const [attendance, setAttendance] = useState([]);
  const getAttendance = async () => {
    try {
      const values = await storage.multiGet(["classid", "sid"]);
      const res = await StudentApi.getAttendance(values[0][1], values[1][1]);
      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // if harware back button pressed
  const handleBack = () => {
    navigation.navigate("shome");
    return true;
  };

  useEffect(() => {
    getAttendance();
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("sdashboard")}>
            <Icon name="md-arrow-round-back" />
          </Button>
        </Left>
        <Body>
          <Title>Attendance</Title>
        </Body>
      </Header>
      <Content>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Date</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Status</Text>
            </DataTable.Title>
          </DataTable.Header>

          {attendance.map((aData) => (
            <DataTable.Row>
              <DataTable.Cell>{aData.date.substring(0, 10)}</DataTable.Cell>
              <DataTable.Cell>{aData.attendance_status}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Content>
    </Container>
  );
}
