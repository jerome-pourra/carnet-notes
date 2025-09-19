import { ActivityIndicator, Text, View } from "react-native";
import { sharedStyles } from "./styles/shared";

export const Loading = () => (
  <View style={sharedStyles.container}>
    <ActivityIndicator size='large' />
    <Text style={sharedStyles.text}>
      Loading data...
    </Text>
  </View>
);