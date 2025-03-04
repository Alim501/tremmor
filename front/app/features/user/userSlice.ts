import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { registration, login } from "./userApi";
const isBrowser = typeof window !== "undefined";

interface UserState {
  email: any;
  isAuth: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  email: null,
  isAuth: isBrowser ? !!localStorage.getItem("token") : false,
  status: "idle",
  error: null,
};

export const userRegistration = createAsyncThunk(
  "user/userRegistration",
  async ({ email, password }: User) => {
    return await registration(email, password);
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ email, password }: User, { rejectWithValue }) => {
    try {
      return await login(email, password);
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const relogin = createAsyncThunk("user/relogin", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  throw new Error("No token found");
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  localStorage.removeItem("token");
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.email = null;
      state.isAuth = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        userRegistration.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.email = action.payload;
          state.isAuth = true;
        }
      )
      .addCase(userRegistration.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.email = action.payload;
        state.isAuth = true;
        console.log(state.isAuth, action.payload);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(relogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(relogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.email = action.payload;
        state.isAuth = true;
      })
      .addCase(relogin.rejected, (state) => {
        state.email = null;
        state.isAuth = false;
        state.status = "idle";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.email = null;
        state.isAuth = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
