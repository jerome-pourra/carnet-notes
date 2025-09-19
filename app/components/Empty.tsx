import { Text, View } from "react-native";

interface EmptyDataProps {
  title?: string;
}

export const EmptyData = ({
  title,
}: EmptyDataProps) => (
  <View>
    <Text>{title ? title : 'No data available'}</Text>
  </View>
);