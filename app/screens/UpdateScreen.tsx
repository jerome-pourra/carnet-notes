import { AppDispatch } from '@/app/store/store';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useDispatch } from 'react-redux';
import { EmptyData } from '../components/Empty';
import { Loading } from '../components/Loading';
import { StackParamList } from '../components/Router';
import { SubmitButton } from '../components/SubmitButton';
import { useNotes } from '../hooks/useNotes';
import { showSnackbar } from '../store/actions/snackbar.action';

type UpdateScreenNavigationProp = NativeStackScreenProps<StackParamList, 'Update'>

export const UpdateScreen = ({
  navigation,
  route,
}: UpdateScreenNavigationProp) => {
  const { id } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { loading, selectedNote, fetchSingleNote, editNote } = useNotes();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const validateFields = useCallback(() => {
    const newErrors: { title?: string; content?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }
    setErrors(newErrors);
    setIsValidForm(Object.keys(newErrors).length === 0);
  }, [title, content]);

  const handleSave = useCallback(async () => {
    if (!selectedNote) {
      // WTF !!! t'es pas trop sencé avoir le btn 'save' si y'a pas d'item... la vue des details est pas rendu (you cheat in my app !!!)
      dispatch(showSnackbar('error', 'No item to delete...'));
      return;
    }

    await editNote({
      ...selectedNote,
      title: title.trim(),
      content: content.trim(),
      updatedAt: new Date().toISOString(),
    });
    navigation.goBack();
  }, [dispatch, navigation, selectedNote, title, content, editNote]);

  useEffect(() => {
    fetchSingleNote(id);
  }, [id, fetchSingleNote]);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || '');
      setContent(selectedNote.content || '');
    }
  }, [selectedNote]);

  useEffect(() => {
    validateFields();
  }, [title, content, validateFields]);

  if (loading) return <Loading />
  if (!selectedNote) return /* WTF !!! */ <EmptyData title={`No data found for id ${id}`} />

  return (
    <View>
      <View style={{ borderWidth: 1 }}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Field</Text>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Value</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1 }}>Title</Text>
          <View style={{ flex: 2 }}>
            <TextInput
              style={{ borderWidth: 1 }}
              value={title}
              placeholder='Enter title here...'
              onChangeText={(text) => {
                setTitle(text);
                if (errors.title && text.trim()) {
                  setErrors(prev => ({ ...prev, title: undefined }));
                }
              }}
            />
            {errors.title && (
              <Text style={{ color: 'red' }}>
                {errors.title}
              </Text>
            )}
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Text style={{ flex: 1 }}>Content</Text>
          <View style={{ flex: 2 }}>
            <TextInput
              style={{ borderWidth: 1 }}
              value={content}
              multiline={true}
              numberOfLines={4}
              placeholder='Enter content here...'
              onChangeText={(text) => {
                setContent(text);
                if (errors.content && text.trim()) {
                  setErrors(prev => ({ ...prev, content: undefined }));
                }
              }}
            />
            {errors.content && (
              <Text style={{ color: 'red' }}>
                {errors.content}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={{ marginTop: 24 }}>
        <SubmitButton
          title="Save"
          onPress={handleSave}
          disabled={!isValidForm}
        />
      </View>
    </View>
  );
};