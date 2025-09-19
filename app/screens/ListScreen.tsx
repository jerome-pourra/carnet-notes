import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EmptyData } from "../components/Empty";
import { Loading } from "../components/Loading";
import { fetchNotes } from "../store/actions/notes.action";
import { notesSelector } from "../store/selectors/notes.selector";
import { AppDispatch } from "../store/store";
import { NoteEntity } from "../store/types/notes.type";
import { formatDate } from "../utils/format";

type RootStackParamList = {
  List: undefined;
  Add: undefined;
  Details: { id: number };
};

type ListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'List'>;

export const ListScreen = () => {
  const { loading, list } = useSelector(notesSelector);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ListScreenNavigationProp>();

  const handleAdd = useCallback(() => {
    navigation.navigate('Add');
  }, [dispatch, navigation]);

  const renderItem = useCallback(({ item }: { item: NoteEntity }) => (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, padding: 10 }}
      onPress={() => navigation.navigate('Details', { id: item.id })}
    >
      <Text style={{ flex: 2 }}>{item.title}</Text>
      <Text style={{ flex: 1 }}>{formatDate(item.updatedAt)}</Text>
    </TouchableOpacity>
  ), [navigation]);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  useEffect(() => {
    // DEBUG
    console.log('List selector:', list.map(i => i.title));
  }, [list]);

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!list || list.length === 0) {
    return (
      <EmptyData />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderWidth: 1, flex: 1 }}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Title</Text>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Date</Text>
        </View>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={{ marginTop: 24 }}>
        <Button title="Add" onPress={handleAdd} />
      </View>
    </View>
  );
};