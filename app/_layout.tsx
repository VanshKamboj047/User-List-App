import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Users' }} />
        <Stack.Screen name="[id]" options={{ title: 'User Details' }} />
      </Stack>
    </>
  );
}

