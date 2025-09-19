import { Text, TouchableOpacity } from "react-native";

interface SubmitButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const SubmitButton = ({
  title,
  onPress,
  disabled = false
}: SubmitButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: disabled ? 'gray' : 'blue',
        padding: 12,
        alignItems: 'center',
        opacity: disabled ? 0.6 : 1,
      }}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text style={{
        color: disabled ? 'black' : 'white',
        fontSize: 16,
        fontWeight: 'bold'
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};