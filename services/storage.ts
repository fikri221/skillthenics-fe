import AsyncStorage from "@react-native-async-storage/async-storage";

export const save = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const load = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const remove = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
