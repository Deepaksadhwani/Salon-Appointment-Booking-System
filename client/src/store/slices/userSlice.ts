import { SERVER_URL } from "@/utils/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserData {
  fullName: string;
  email: string;
  photoUrl: string;
}

interface UserState {
  token: string | null;
  userData: UserData | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UserState = {
  token: null,
  userData: null,
  isError: false,
  isLoading: false,
};

/*---------------getUser data------------------------------*/
export const getUser = createAsyncThunk("getUser", async () => {
  const TOKEN = localStorage.getItem("token");
  const HEADERDATA = {
    headers: {
      authentication: `Bearer ${TOKEN}`,
    },
  };
  const response = await axios.get(
    `${SERVER_URL}/profile/get-user`,
    HEADERDATA,
  );
  console.log("getUser",response);
  return response.data.data;
});

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (data: any, { dispatch }) => {
    const TOKEN = localStorage.getItem("token");
    const HEADERDATA = {
      headers: {
        authentication: `Bearer ${TOKEN}`,
      },
    };
    const response = await axios.post(
      `${SERVER_URL}/profile/update-profile`,
      data,
      HEADERDATA,
    );
    console.log(response);
    dispatch(getUser());
  },
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    removeToken: (state) => {
      state.token = null;
    },
    removeUserData: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      (state.isLoading = false), (state.userData = action.payload);
    }),
      builder.addCase(getUser.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(getUser.rejected, (state) => {
        state.isError = true;
      }),
      builder.addCase(updateUserProfile.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.userData = action.payload;
      }),
      builder.addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(updateUserProfile.rejected, (state) => {
        state.isError = true;
      });
  },
});

export const { addToken, removeToken, removeUserData } = userSlice.actions;
export default userSlice.reducer;
