import * as SecureStore from 'expo-secure-store';

export default function useStorage() {

    const storeItem = async (key: string, value: string) => {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.log('Error storing data: ', error);
        }
    };

    const getItem = async (key: string) => {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.log('Error retrieving data: ', error);
        }
    };

    const removeItem = async (key: string) => {
        try {
            return await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.log('Error removing data: ', error);
        }
    };

    return {
        getItem,
        storeItem,
        removeItem
    }
}