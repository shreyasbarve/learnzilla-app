// core
import React, { useState } from "react";
import { AppLoading } from "expo";

// Fonts
import * as Font from "expo-font";
import MainNavigator from "./routes/MainNavigator";

const getFonts = async () =>
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return <MainNavigator />;
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
