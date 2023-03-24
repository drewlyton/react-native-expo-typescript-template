import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  GestureResponderEvent,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { addItem } from "../../src/api";

export default function TabTwoScreen() {
  const [text, onChangeText] = useState<string>("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
  });

  async function addNewItem(event: GestureResponderEvent) {
    mutate({ id: Math.random(), content: text });
    onChangeText("");
  }
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text className="text-xl font-bold my-5">Add Item</Text>
      <SafeAreaView className="flex-1 w-[80%]">
        <View className="border-t-[1px] border-gray-200 w-full" />
        <TextInput
          placeholder="Your text"
          placeholderTextColor={"rgb(156, 163, 175)"}
          className="px-3 py-5 text-lg border-[1px] rounded-md"
          style={{ lineHeight: undefined }}
          value={text}
          onChangeText={onChangeText}
          autoFocus
        />
        <TouchableOpacity
          className="mt-5 active:bg-slate-700"
          onPress={addNewItem}
        >
          <View className="rounded bg-slate-800 py-3">
            <Text className="text-center text-white">Save</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}
