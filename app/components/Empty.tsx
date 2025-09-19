import { Text, View } from "react-native";
import { sharedStyles } from "./styles/shared";

interface EmptyDataProps {
  title?: string;
}

export const EmptyData = ({
  title,
}: EmptyDataProps) => (
  <View style={sharedStyles.container}>
    <Text style={sharedStyles.text}>
      {title ? title : 'No data available'}
    </Text>
  </View>
);