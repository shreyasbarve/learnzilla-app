// core
import React, { useState } from "react";
import { AppLoading } from "expo";
import { Root } from "native-base";
import { Provider as PaperProvider } from "react-native-paper";

// Fonts
import * as Font from "expo-font";
import MainNavigator from "./src/routes/MainNavigator";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const getFonts = async () =>
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Root>
        <PaperProvider>
          <MainNavigator />
        </PaperProvider>
      </Root>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
