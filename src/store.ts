import { combineReducers, configureStore } from '@reduxjs/toolkit';
import playerReducer from './reducers/playerReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import playlistReducer from './reducers/playlistReducer';

const playerPersistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};
const playlistPersistConfig = {
  key: 'playlist',
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  player: persistReducer(playerPersistConfig, playerReducer),
  playlist: persistReducer(playlistPersistConfig, playlistReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred types eg:>> {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
