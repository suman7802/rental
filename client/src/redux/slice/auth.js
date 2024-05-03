import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import Token from '../../utils/Token';
import authentication from '../../services/auth.service';
import FormatFirebaseError from '../../utils/FormateFirebaseError';

const handleAuthAction = async (fn, email, password) => {
  try {
    const user = await fn(email, password);

    const idToken = await user.getIdToken();

    return {
      uid: user.uid,
      email: user.email,
      credential: {
        idToken,
        refreshToken: user.refreshToken,
      },
    };
  } catch (error) {
    return {
      code: error.code,
      message: error.message,
    };
  }
};

export const signUp = createAsyncThunk('auth/signUp', async (_, {getState}) => {
  const {email, password} = getState().auth;
  return handleAuthAction(authentication.signUp, email, password);
});

export const signIn = createAsyncThunk('auth/signIn', async (_, {getState}) => {
  const {email, password} = getState().auth;
  return handleAuthAction(authentication.signIn, email, password);
});

export const google = createAsyncThunk('auth/google', async () => {
  try {
    const {user} = await authentication.signInWithGoogle();
    const idToken = await user.getIdToken();
    return {
      idToken,
      refreshToken: user.refreshToken,
    };
  } catch (error) {
    return {
      code: error.code,
      message: error.message,
    };
  }
});

export const facebook = createAsyncThunk('auth/facebook', async () => {
  try {
    const {user} = await authentication.signInWithFacebook();
    const idToken = await user.getIdToken();
    return {
      idToken,
      refreshToken: user.refreshToken,
    };
  } catch (error) {
    return {
      code: error.code,
      message: error.message,
    };
  }
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  try {
    const result = await authentication.signOut();
    return result;
  } catch (error) {
    return {
      code: error.code,
      message: error.message,
    };
  }
});

/**
 *
 *------------------------------------------
 *               authSlice
 * -----------------------------------------
 */

const initialState = {
  email: '',
  password: '',
  isLoading: false,
  isError: false,
  status: null,
  response: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
      if (action.payload.code) {
        state.isError = true;
        state.status = FormatFirebaseError(action.payload.message);
      } else {
        state.isError = false;
        state.status = 'Sign up successful';

        const idToken = action.payload.credential.idToken;
        const refreshToken = action.payload.credential.refreshToken;
        Token.store(idToken, refreshToken);
      }
    });

    builder.addCase(signUp.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.status = 'Sign up failed';
    });

    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
      if (action.payload.code) {
        state.isError = true;
        state.status = FormatFirebaseError(action.payload.message);
      } else {
        state.isError = false;
        state.status = 'Sign in successful';

        const idToken = action.payload.credential.idToken;
        const refreshToken = action.payload.credential.refreshToken;
        Token.store(idToken, refreshToken);
      }
    });

    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.status = 'Sign in failed';
    });

    builder.addCase(signOut.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signOut.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.status = 'Sign out successful';
      state.response = null;
      Token.clear();
    });

    builder.addCase(signOut.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.status = 'Sign out failed';
    });

    builder.addCase(google.pending, (state) => {
      state.isLoading = false;
    });

    builder.addCase(google.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response = action.payload;

      if (action.payload.code) {
        state.isError = true;
        state.status = FormatFirebaseError(action.payload.message);
      } else {
        state.isError = false;
        state.status = 'Sign in successful';

        const idToken = action.payload.idToken;
        const refreshToken = action.payload.refreshToken;
        Token.store(idToken, refreshToken);
      }
    });

    builder.addCase(google.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.status = 'Sign in failed';
    });

    builder.addCase(facebook.pending, (state) => {
      state.isLoading = false;
    });

    builder.addCase(facebook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response = action.payload;

      if (action.payload.code) {
        state.isError = true;
        state.status = FormatFirebaseError(action.payload.message);
      } else {
        state.isError = false;
        state.status = 'Sign in successful';

        const idToken = action.payload.idToken;
        const refreshToken = action.payload.refreshToken;
        Token.store(idToken, refreshToken);
      }
    });

    builder.addCase(facebook.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.status = 'Sign in failed';
    });
  },
});

export const {setEmail, setPassword} = authSlice.actions;
export default authSlice.reducer;
