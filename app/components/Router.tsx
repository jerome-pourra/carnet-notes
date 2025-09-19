import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailsScreen } from "../screens/DetailsScreen";
import { ListScreen } from "../screens/ListScreen";

export type PackagesStackParamList = {
  List: undefined;
  Details: { id: number };
};

const Stack = createNativeStackNavigator<PackagesStackParamList>({
  screens: {
    List: ListScreen,
    Details: DetailsScreen,
  },
});

export const Router = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        contentStyle: {
          flex: 1,
        }
      }}
    >
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)