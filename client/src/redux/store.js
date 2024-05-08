import {configureStore} from '@reduxjs/toolkit';

import authReducer from './slice/auth';
import profileReducer from './slice/profile';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
