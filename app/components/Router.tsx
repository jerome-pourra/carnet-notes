import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailsScreen } from "../screens/DetailsScreen";
import { ListScreen } from "../screens/ListScreen";
import { UpdateScreen } from "../screens/UpdateScreen";

export type StackParamList = {
  List: undefined;
  Details: { id: number };
  Update: { id: number };
};

const Stack = createNativeStackNavigator<StackParamList>({
  screens: {
    List: ListScreen,
    Details: DetailsScreen,
    Update: UpdateScreen,
  },
});

export const Router = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        contentStyle: {
          flex: 1,
          padding: 16,
        }
      }}
    >
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)