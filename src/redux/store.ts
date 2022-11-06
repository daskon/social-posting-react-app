import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userStateValue {
    userName: string;
}
interface userState {
    value: userStateValue;
}

const initialState = { value: { userName: "" } } as userState;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state: userState, action: PayloadAction<userStateValue>) => {
            state.value = action.payload;
        },
        logout: (state, action) => {
            state.value = initialState.value;
        }
    }
});

export const {login,logout} = userSlice.actions;
export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});