import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_HIDE } from '../store/actions/actions';
import { snackbarSelector } from '../store/selectors/snackbar.selector';

export const CustomSnackbar = () => {
  const { show, type, message } = useSelector(snackbarSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show && message) {
      const timer = setTimeout(() => {
        dispatch({ type: SNACKBAR_HIDE });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, message, dispatch]);

  if (!show || !message) return null;

  return (
    <View style={{
      position: 'absolute',
      top: 5,
      right: 5,
      padding: 6,
      zIndex: 1000,
      backgroundColor: type === 'success' ? 'green' : 'red'
    }}>
      <Text style={{
        color: 'white',
        textAlign: 'center'
      }}>
        {message}
      </Text>
    </View>
  );
};
