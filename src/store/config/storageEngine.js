import AsyncStorage from '@react-native-async-storage/async-storage';

const createNoopStorage = () => {
  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
};

const storageEngine = typeof window !== 'undefined' ?  AsyncStorage : createNoopStorage();

export default storageEngine;