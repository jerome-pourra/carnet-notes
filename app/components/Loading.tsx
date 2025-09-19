import { ActivityIndicator, Text, View } from "react-native";

export const Loading = () => (
  <View>
    <ActivityIndicator />
    <Text>Loading data...</Text>
  </View>
);