import { Stack } from "expo-router";
import store from "../../hooks/store"

const Layout = () => {
  return (

    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="user-sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="blogger-sign-up-1" options={{ headerShown: false }} />
      <Stack.Screen name="blogger-sign-up-2" options={{ headerShown: false }} />
      <Stack.Screen name="blogger-sign-up-3" options={{ headerShown: false }} />
      <Stack.Screen name="blogger-sign-up-4" options={{ headerShown: false }} />




    </Stack>
  );
};

export default Layout;
