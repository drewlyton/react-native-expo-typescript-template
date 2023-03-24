import { useQuery } from "@tanstack/react-query";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { getItems, IItem } from "../../src/api";

const Item: React.FC<{ item: IItem }> = ({ item }) => {
  return (
    <View className="py-5 border-b-[1px] border-gray-200 w-full">
      <Text>{item.content}</Text>
    </View>
  );
};

export default function ItemsScreen() {
  const { data } = useQuery({
    queryFn: getItems,
    queryKey: ["items"],
  });
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold my-5">View Items</Text>
      <SafeAreaView className="flex-1 w-[80%]">
        <View className="border-t-[1px] border-gray-200 w-full" />
        <FlatList
          data={data}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}
