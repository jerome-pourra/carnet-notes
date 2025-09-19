
import { AppDispatch } from "@/app/store/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EmptyData } from "../components/Empty";
import { Loading } from "../components/Loading";
import { StackParamList } from "../components/Router";
import { deleteNote, fetchNote } from "../store/actions/notes.action";
import { showSnackbar } from "../store/actions/snackbar.action";
import { notesSelector } from "../store/selectors/notes.selector";
import { formatDate } from "../utils/format";

type DetailsScreenNavigationProp = NativeStackScreenProps<StackParamList, 'Details'>

export const DetailsScreen = ({
  route,
  navigation,
}: DetailsScreenNavigationProp) => {
  const { id } = route.params;
  const { loading, item } = useSelector(notesSelector);
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdate = useCallback(() => {
    if (!item) {
      // WTF !!! t'es pas trop sencé avoir le btn 'update' si y'a pas d'item... la vue des details est pas rendu (you cheat in my app !!!)
      dispatch(showSnackbar('error', 'No item to update...'));
      return;
    }
    navigation.navigate('Update', { id: item.id });
  }, [navigation, item]);

  const handleDelete = useCallback(() => {
    if (!item) {
      // WTF !!! t'es pas trop sencé avoir le btn 'delete' si y'a pas d'item... la vue des details est pas rendu (you cheat in my app !!!)
      dispatch(showSnackbar('error', 'No item to delete...'));
      return;
    }
    dispatch(deleteNote(item.id, item.title));
    navigation.goBack();
  }, [dispatch, navigation, item]);

  // Fetch note on component mount and when route.params change
  useEffect(() => {
    dispatch(fetchNote(id));
  }, [id, dispatch]);

  // DEBUG when item changes
  useEffect(() => {
    // console.log(`Item ${id} selector:`, item?.title);
  }, [item]);

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!item) {
    // WTF !!! faut restart le server y'a des modifs qui ont été effectué sur db.json le state list est plus à jour...
    return (
      <EmptyData
        title={`No data found for id ${id}`}
      />
    )
  }

  return (
    <View>
      <View style={{ borderWidth: 1 }}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Field</Text>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Value</Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1 }}>Id</Text>
          <Text style={{ flex: 2 }}>{item.id}</Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1 }}>Title</Text>
          <Text style={{ flex: 2 }}>{item.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1 }}>Content</Text>
          <Text style={{ flex: 2 }}>{item.content}</Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1 }}>Created at</Text>
          <Text style={{ flex: 2 }}>{formatDate(item.createdAt)}</Text>
        </View>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text style={{ flex: 1 }}>Updated at</Text>
          <Text style={{ flex: 2 }}>{formatDate(item.updatedAt)}</Text>
        </View>
      </View>
      <View style={{ marginTop: 24, flexDirection: 'row', gap: 10, justifyContent: 'flex-end' }}>
        <Button title="Delete" onPress={handleDelete} />
        <Button title="Update" onPress={handleUpdate} />
      </View>
    </View>
  );
};