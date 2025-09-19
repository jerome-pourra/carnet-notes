import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EmptyData } from "../components/Empty";
import { Loading } from "../components/Loading";
import { fetchNotes } from "../store/actions/notes.action";
import { notesSelector } from "../store/selectors/notes.selector";
import { AppDispatch } from "../store/store";
import { NoteEntity } from "../store/types/notes.type";
import { formatDate, formatText } from "../utils/format";

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

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Navigate to Add screen
  const handleAdd = useCallback(() => {
    navigation.navigate('Add');
  }, [dispatch, navigation]);

  // Refresh list of notes by button
  const handleRefresh = useCallback(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  // Filter list based on search query (only client-side...)
  const filteredList = useCallback(() => {
    if (!searchQuery.trim()) {
      return list;
    }
    return list.filter(item => formatText(item.title).includes(formatText(searchQuery)));
  }, [list, searchQuery]);

  // Render item for FlatList
  const renderItem = useCallback(({ item }: { item: NoteEntity }) => (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, padding: 10 }}
      onPress={() => navigation.navigate('Details', { id: item.id })}
    >
      <Text style={{ flex: 2 }}>{item.title}</Text>
      <Text style={{ flex: 1 }}>{formatDate(item.updatedAt)}</Text>
    </TouchableOpacity>
  ), [navigation]);

  // Render when list is empty
  const renderEmptyComponent = useCallback(() => (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Text>
        {`No notes found for "${searchQuery}"`}
      </Text>
    </View>
  ), [searchQuery]);

  // Fetch notes on component mount
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  // DEBUG when list changes
  useEffect(() => {
    // console.log('List selector:', list.map(i => i.title));
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

  console.log("Render ListScreen");
  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 16, borderWidth: 1 }}>
        <TextInput
          placeholder="Search notes by title..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={{ borderWidth: 1, flex: 1 }}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Title</Text>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Date</Text>
        </View>
        <FlatList
          data={filteredList()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
      <View style={{ marginTop: 24, flexDirection: 'row', gap: 10, justifyContent: 'flex-end' }}>
        <Button title="Add" onPress={handleAdd} />
        <Button title="Refresh" onPress={handleRefresh} />
      </View>
    </View>
  );
};