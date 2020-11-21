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
  Toast,
} from "native-base";
import { ProgressBar, Colors } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import storage from "@react-native-community/async-storage";
import { DataTable } from "react-native-paper";

// api
import TeacherApi from "../../../api/TeacherApi";

export default function Attendance() {
  // navigation
  const navigation = useNavigation();

  // if get all attendance display
  const [loading, setLoading] = useState(true);

  // get attendance
  const [attendance, setAttendance] = useState([]);
  const getAttendance = async () => {
    try {
      const values = await storage.multiGet(["classid"]);
      const res = await TeacherApi.getAttendance(values[0][1]);
      setAttendance(res.data);
      setLoading(false);
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
    getAttendance();
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
              <Title style={{ color: "#000" }}>Attendance</Title>
            </Body>
            <Right>
              <Button transparent hasText onPress={getAttendance}>
                <Text style={{ color: "#000" }}>Update</Text>
              </Button>
            </Right>
          </Header>
          <Content padder>
            <DataTable style={{ borderWidth: 0.5 }}>
              <DataTable.Header>
                <DataTable.Title>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>Name</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>Date</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Status
                  </Text>
                </DataTable.Title>
              </DataTable.Header>

              {attendance.map((aData) => (
                <DataTable.Row
                  style={{
                    padding: 10,
                    borderBottomWidth: 2,
                  }}
                >
                  <DataTable.Cell>{aData.name}</DataTable.Cell>
                  <DataTable.Cell>{aData.date.substring(0, 10)}</DataTable.Cell>
                  <DataTable.Cell>{aData.attendance_status}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Content>
        </Container>
      )}
    </>
  );
}
