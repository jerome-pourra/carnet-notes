
import { AppDispatch } from "@/app/store/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { EmptyData } from "../components/Empty";
import { Loading } from "../components/Loading";
import { StackParamList } from "../components/Router";
import { useNotes } from "../hooks/useNotes";
import { showSnackbar } from "../store/actions/snackbar.action";
import { formatDate } from "../utils/format";

type DetailsScreenNavigationProp = NativeStackScreenProps<StackParamList, 'Details'>

export const DetailsScreen = ({
  route,
  navigation,
}: DetailsScreenNavigationProp) => {
  const { id } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { loading, selectedNote, fetchSingleNote, removeNote } = useNotes();

  const handleUpdate = useCallback(() => {
    if (!selectedNote) {
      dispatch(showSnackbar('error', 'No item to update...'));
      return;
    }
    navigation.navigate('Update', { id: selectedNote.id });
  }, [dispatch, navigation, selectedNote]);

  const handleDelete = useCallback(async () => {
    if (!selectedNote) {
      // WTF !!! t'es pas trop sencé avoir le btn 'delete' si y'a pas d'item... la vue des details est pas rendu (you cheat in my app !!!)
      dispatch(showSnackbar('error', 'No item to delete...'));
      return;
    }
    await removeNote(selectedNote.id, selectedNote.title);
    navigation.goBack();
  }, [dispatch, removeNote, navigation, selectedNote]);

  // Fetch note on component mount and when route.params change
  useEffect(() => {
    fetchSingleNote(id);
  }, [id, fetchSingleNote]);

  if (loading) return <Loading />
  if (!selectedNote) return /* WTF !!! */ <EmptyData title={`No data found for id ${id}`} />

  return (
    <View>
      <View style={{ borderWidth: 1 }}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Field</Text>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Value</Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1 }}>Id</Text>
          <Text style={{ flex: 2 }}>{selectedNote.id}</Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1 }}>Title</Text>
          <Text style={{ flex: 2 }}>{selectedNote.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1 }}>Content</Text>
          <Text style={{ flex: 2 }}>{selectedNote.content}</Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1 }}>Created at</Text>
          <Text style={{ flex: 2 }}>{formatDate(selectedNote.createdAt)}</Text>
        </View>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text style={{ flex: 1 }}>Updated at</Text>
          <Text style={{ flex: 2 }}>{formatDate(selectedNote.updatedAt)}</Text>
        </View>
      </View>
      <View style={{ marginTop: 24, flexDirection: 'row', gap: 10, justifyContent: 'flex-end' }}>
        <Button title="Delete" onPress={handleDelete} />
        <Button title="Update" onPress={handleUpdate} />
      </View>
    </View>
  );
};