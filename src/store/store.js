import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import authReducer from './Slice/authSlice';
import skillsReducer from './Slice/skillsSlice';
import projectsReducer from './Slice/projectSlice';
import membersReducer from './Slice/membersSlice';
import userProfileSlice from './Slice/userProfileSlice';
import settingsUserSlice from './Slice/settingsUserSlice';
import helpRequestReducer from './Slice//helpRequestSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    skills: skillsReducer,
    projects: projectsReducer,
    members: membersReducer,
    user: userProfileSlice,
    settings: settingsUserSlice,
    helpRequest: helpRequestReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export const persistor = persistStore(store);


