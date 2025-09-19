
import { AppDispatch } from "@/app/store/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EmptyData } from "../components/Empty";
import { Loading } from "../components/Loading";
import { StackParamList } from "../components/Router";
import { fetchNote } from "../store/actions/notes.action";
import { notesSelector } from "../store/selectors/notes.selector";

type DetailsScreenNavigationProp = NativeStackScreenProps<StackParamList, 'Details'>

export const DetailsScreen = ({
  route,
  navigation,
}: DetailsScreenNavigationProp) => {
  const { id } = route.params;
  const { loading, item } = useSelector(notesSelector);
  const dispatch = useDispatch<AppDispatch>();

  // const handleUpdate = useCallback(() => {
  //   navigation.navigate('Update', { pkg });
  // }, [navigation, pkg]);

  // const handleDelete = useCallback(() => {
  //   dispatch(deletePackage(pkg));
  //   navigation.goBack();
  // }, [dispatch, navigation, pkg]);

  useEffect(() => {
    dispatch(fetchNote(id));
  }, [id, dispatch]);

  useEffect(() => {
    // DEBUG
    console.log(`Item ${id} updated:`, item);
  }, [item, id]);

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!item) {
    return (
      <EmptyData
        title={`No data found for id ${id} !!! WHAT ZE FUCK !!!`}
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
          <Text style={{ flex: 2 }}>{item.createdAt}</Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
          <Text style={{ flex: 1 }}>Updated at</Text>
          <Text style={{ flex: 2 }}>{item.updatedAt}</Text>
        </View>
      </View>
      <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* <Button title="Delete" onPress={handleDelete} />
        <Button title="Update" onPress={handleUpdate} /> */}
      </View>
    </View>
  );
};