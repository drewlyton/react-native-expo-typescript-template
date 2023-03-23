import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IItem {
  id: number;
  content: string;
}
const ITEMS = Symbol("ITEMS").toString();

export async function getItems() {
  try {
    const value = await AsyncStorage.getItem(ITEMS);
    if (value !== null) {
      return JSON.parse(value) as IItem[];
    } else {
      return [
        { id: 1, content: "This is a test item" },
        { id: 2, content: "This is a second test item" },
      ];
    }
  } catch (e) {
    // error reading value
    console.error("Error loading items", e);
  }
}

export async function addItem(item: IItem) {
  try {
    const items = await getItems();
    if (!items) {
      throw Error("No items present");
    }
    items.push(item);
    await AsyncStorage.setItem(ITEMS, JSON.stringify(items));
    return item;
  } catch (e) {
    // error reading value
    console.error("Error adding item to storage", e);
    return null;
  }
}
