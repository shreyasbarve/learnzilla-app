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
import StudentApi from "../../api/StudentApi";

export default function Profile() {
    // navigation
    const navigation = useNavigation();

    const setData = async () => {
        try {
            const values = await storage.multiGet(["sname", "smail", "skey"]);
            setStudentData({
                ...studentData,
                name: JSON.stringify(values[0][1]).substring(
                    1,
                    values[0][1].length
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
    let [studentData, setStudentData] = React.useState({
        name: "",
        email: "",
        password: "",
        newpass: "",
        key: "",
    });

    const changePassword = async () => {
        try {
            await StudentApi.changePassword(studentData, studentData.name);
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
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.navigate("sdashboard")}>
                        <Icon name="md-arrow-round-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>Profile</Title>
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
                        <Input disabled value={studentData.name} />
                    </Item>

                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input disabled value={studentData.email} />
                    </Item>

                    <Item stackedLabel>
                        <Label>Old Password</Label>
                        <Input
                            secureTextEntry={true}
                            value={studentData.password}
                            onChangeText={(e) =>
                                setStudentData({ ...studentData, password: e })
                            }
                        />
                    </Item>

                    <Item stackedLabel>
                        <Label>New Password</Label>
                        <Input
                            secureTextEntry={true}
                            value={studentData.newpass}
                            onChangeText={(e) =>
                                setStudentData({ ...studentData, newpass: e })
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
