import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Aora</Text>
      <Link href="/home" className="text-blue-500">
        Go to Home
      </Link>
    </View>
  );
}
