import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { EmptyData } from "../components/Empty";
import { Loading } from "../components/Loading";
import { StackParamList } from "../components/Router";
import { useNotes } from "../hooks/useNotes";
import { NoteEntity } from "../store/types/notes.type";
import { formatDate, formatText } from "../utils/format";

type ListScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'List'>;

export const ListScreen = () => {
  const navigation = useNavigation<ListScreenNavigationProp>();
  const { loading, notes, hasNotes, fetchAllNotes } = useNotes();

  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAdd = useCallback(() => {
    navigation.navigate('Add');
  }, [navigation]);

  // Filter list based on search query (only client-side...)
  const filteredList = useCallback(() => {
    if (!searchQuery.trim()) {
      return notes;
    }
    return notes.filter(item => formatText(item.title).includes(formatText(searchQuery)));
  }, [notes, searchQuery]);

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
      <Text>{`No notes found for "${searchQuery}"`}</Text>
    </View>
  ), [searchQuery]);

  if (loading) return <Loading />
  if (!hasNotes) return <EmptyData />;

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
        <Button title="Refresh" onPress={fetchAllNotes} />
      </View>
    </View>
  );
};