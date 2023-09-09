import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
  type: string;
  enabled: boolean;
}

export interface Props {
  form: User;
}
const initialState: Props = {
  form: {
    id: "",
    username: "",
    type: "",
    enabled: true,
  },
};

export const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
