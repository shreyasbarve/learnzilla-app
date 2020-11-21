// core
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Button,
  BackHandler,
} from "react-native";
import Swiper from "react-native-swiper";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

// api
import InstitutionApi from "../api/InstitutionApi";

export default function Landing() {
  // navigation
  const navigation = useNavigation();

  const login = async () => {
    try {
      const { data } = InstitutionApi.login();
    } catch (error) {
      console.log(error);
    }
  };

  // exit
  const handleBack = () => {
    BackHandler.exitApp();
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);

  return (
    <SafeAreaView>
      <ScrollView directionalLockEnabled>
        <View style={styles.container}>
          <View>
            <Text style={styles.mainText}>E Learning App</Text>
          </View>
          <View style={styles.sliderContainer}>
            <Swiper autoplay height={200}>
              <View style={styles.slide}>
                <Image
                  source={require("../../assets/swipper1.png")}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={require("../../assets/swipper5.png")}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={require("../../assets/swipper2.png")}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={require("../../assets/swipper4.png")}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
            </Swiper>
          </View>
          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <Image
                  source={require("../../assets/feature3.png")}
                  resizeMode="cover"
                  style={styles.feature}
                />
              </View>
              <Text style={styles.categoryBtnTxt}>E-Education</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <Image
                  source={require("../../assets/interaction.png")}
                  resizeMode="cover"
                  style={styles.feature}
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Interaction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <Image
                  source={require("../../assets/progress.png")}
                  resizeMode="cover"
                  style={styles.feature}
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Daily Progress</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <Image
                  source={require("../../assets/responsive.png")}
                  resizeMode="cover"
                  style={styles.feature}
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Responsive</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <Image
                  source={require("../../assets/assignments.png")}
                  resizeMode="cover"
                  style={styles.feature}
                />
              </View>
              <Text style={styles.categoryBtnTxt}>Assignments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <Image
                  source={require("../../assets/feature4.png")}
                  resizeMode="cover"
                  style={styles.feature}
                />
              </View>
              <Text style={styles.categoryBtnTxt}>User Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.login}>
            <Text style={styles.loginTxt}>Use The App</Text>
            <View style={styles.loginButtonView}>
              <Button
                title="Login as Teacher"
                color="#e73895"
                style={styles.loginButton}
                onPress={() => navigation.navigate("tauth")}
              />
            </View>
            <View style={styles.loginButtonView}>
              <Button
                title="Login as Student"
                color="#e73895"
                style={styles.loginButton}
                onPress={() => navigation.navigate("sauth")}
              />
            </View>
          </View>

          <View>
            <Text style={styles.teamtxt}>Meet the Team</Text>
            <Text style={styles.teamSubTxt}>
              We've got a strong team filled with caffeine addicted developers,
              gradient loving designers and machine like working managers.
            </Text>

            <View style={styles.teamIcon}>
              <Image
                source={require("../../assets/tejas.png")}
                resizeMode="cover"
                style={styles.teamImage}
              />
              <Text style={styles.memberTxt}>Tejas Tapas</Text>
            </View>
            <View style={styles.teamIcon}>
              <Image
                source={require("../../assets/shreyas.png")}
                resizeMode="cover"
                style={styles.teamImage}
              />
              <Text style={styles.memberTxt}>Shreyas Barve</Text>
            </View>
            <View style={styles.teamIcon}>
              <Image
                source={require("../../assets/rishabh.png")}
                resizeMode="cover"
                style={styles.teamImage}
              />
              <Text style={styles.memberTxt}>Rishabh Rathi</Text>
            </View>
            <View style={styles.teamIcon}>
              <Image
                source={require("../../assets/aditya.png")}
                resizeMode="cover"
                style={styles.teamImage}
              />
              <Text style={styles.memberTxt}>Aditya Morankar</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },

  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  mainText: {
    fontSize: 30,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
    color: "#DE354C",
  },
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: "#fdeae7" /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "#de4f35",
  },
  feature: {
    width: "80%",
    height: "80%",
  },
  login: {
    width: "100%",
    height: 200,
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#fdeae7",
  },
  loginTxt: {
    textAlign: "center",
    fontSize: 25,
    padding: 20,
  },
  loginButtonView: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
  },

  loginButton: {
    borderRadius: 100,
  },

  teamtxt: {
    textAlign: "center",
    fontSize: 30,
    padding: 10,
    color: "#DE354C",
  },
  teamSubTxt: {
    textAlign: "center",
    fontSize: 16,
    padding: 10,
    color: "#FF69B4",
  },
  teamContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  teamImage: {
    width: 150,
    height: 150,
    borderRadius: 70,
  },

  teamIcon: {
    marginBottom: 20,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  memberTxt: {
    textAlign: "center",
    fontSize: 25,
    paddingTop: 10,
    color: "#de4f35",
  },
});
