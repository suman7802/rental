import {configureStore} from '@reduxjs/toolkit';

import authReducer from './slice/auth';
import unitReducer from './slice/unit';
import profileReducer from './slice/profile';

const store = configureStore({
  reducer: {
    auth: authReducer,
    unit: unitReducer,
    profile: profileReducer,
  },
});

export default store;
