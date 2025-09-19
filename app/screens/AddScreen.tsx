import { AppDispatch } from '@/app/store/store';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useDispatch } from 'react-redux';
import { StackParamList } from '../components/Router';
import { addNote } from '../store/actions/notes.action';

type AddScreenNavigationProp = NativeStackScreenProps<StackParamList, 'Add'>

export const AddScreen = ({
  navigation,
}: AddScreenNavigationProp) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleAdd = useCallback(async () => {
    await dispatch(addNote({
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    navigation.goBack();
  }, [dispatch, navigation, title, content]);

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
        <Button title="Add" onPress={handleAdd} />
      </View>
    </View>
  );
};