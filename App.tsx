import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Router } from './app/components/Router';
import { CustomSnackbar } from './app/components/Snackbar';
import { store } from './app/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Router />
            <CustomSnackbar />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}