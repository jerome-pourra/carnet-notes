import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../store/actions/notes.action";
import { notesSelector } from "../store/selectors/notes.selector";
import { AppDispatch } from "../store/store";
import { NoteEntity } from "../store/types/notes.type";

type RootStackParamList = {
  List: undefined;
  Details: { id: number };
};

type ListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'List'>;

export const ListScreen = () => {
  const { loading, list } = useSelector(notesSelector);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ListScreenNavigationProp>();

  const renderItem = useCallback(({ item }: { item: NoteEntity }) => (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, padding: 10 }}
      onPress={() => navigation.navigate('Details', { id: item.id })}
    >
      <Text style={{ flex: 2 }}>{item.title}</Text>
      <Text style={{ flex: 1 }}>{new Date(item.createdAt).toLocaleDateString('en-US')}</Text>
    </TouchableOpacity>
  ), [navigation]);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View style={{ borderWidth: 1, marginTop: 16 }}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Title</Text>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Status</Text>
        </View>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};