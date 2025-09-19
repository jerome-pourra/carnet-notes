import { AppDispatch } from '@/app/store/store';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { StackParamList } from '../components/Router';
import { fetchNote, updateNote } from '../store/actions/notes.action';
import { showSnackbar } from '../store/actions/snackbar.action';
import { notesSelector } from '../store/selectors/notes.selector';

type UpdateScreenNavigationProp = NativeStackScreenProps<StackParamList, 'Update'>

export const UpdateScreen = ({
  navigation,
  route,
}: UpdateScreenNavigationProp) => {
  const { id } = route.params;
  const { loading, item } = useSelector(notesSelector);
  const dispatch = useDispatch<AppDispatch>();

  // id: number;
  // title: string;
  // content: string;
  // createdAt: string;
  // updatedAt: string;

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSave = useCallback(async () => {
    if (!item) {
      // WTF !!! t'es pas trop sencé avoir le btn 'save' si y'a pas d'item... la vue des details est pas rendu (you cheat in my app !!!)
      dispatch(showSnackbar('error', 'No item to delete...'));
      return;
    }
    await dispatch(updateNote({
      ...item,
      title: title.trim(),
      content: content.trim(),
      updatedAt: new Date().toISOString(),
    }));
    navigation.goBack();
  }, [dispatch, navigation, item, title, content]);

  useEffect(() => {
    dispatch(fetchNote(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setContent(item.content || '');
    }
  }, [item]);

  return (
    <View>
      <View style={{ borderWidth: 1 }}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Field</Text>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Value</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1 }}>Title</Text>
          <TextInput
            style={{ flex: 2, borderWidth: 1 }}
            value={title}
            onChangeText={setTitle}
            placeholder='Enter title here...'
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Text style={{ flex: 1 }}>Content</Text>
          <TextInput
            style={{ flex: 2, borderWidth: 1 }}
            value={content}
            multiline={true}
            numberOfLines={4}
            onChangeText={setContent}
            placeholder='Enter content here...'
          />
        </View>
      </View>
      <View style={{ marginTop: 24 }}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};