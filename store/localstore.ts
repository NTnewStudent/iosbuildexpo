import * as SecureStore from 'expo-secure-store';

// 添加数据到存储
export const addToSecureStore = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log('数据已添加到存储');
  } catch (error) {
    console.log('添加数据到存储时出错:', error);
  }
};

// 从存储中删除数据
export const deleteFromSecureStore = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log('数据已从存储中删除');
  } catch (error) {
    console.log('从存储中删除数据时出错:', error);
  }
};

// 从存储中查找数据
export const findInSecureStore = async (key: string): Promise<string | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    console.log('在存储中找到数据:', value);
    return value;
  } catch (error) {
    console.log('在存储中查找数据时出错:', error);
    return null;
  }
};