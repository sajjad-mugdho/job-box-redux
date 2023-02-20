import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
    user: {
        email: "",
        role: "",
    },
    isLoading: true,
    isError: false,
    error: "",
};

export const createUser = createAsyncThunk("auth/createUser", async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
})
export const getUser = createAsyncThunk("auth/getUser", async (email) => {
    const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`);
    const data = await res.json();
    return data;
})
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
})
export const googleSignIn = createAsyncThunk("auth/GoogleSignin", async () => {
    const googleProvider = new GoogleAuthProvider();
    const data = signInWithPopup(auth, googleProvider)
    return data.user.email;
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user.email = "";
        },
        setUser: (state, { payload }) => {
            state.user.email = payload;
            state.isLoading = false;
        },
        toggleLoading: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        }).addCase(createUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.user.email = payload;
            state.error = "";
        }).addCase(createUser.rejected, (state, action) => {
            state.isLoading = true;
            state.user.email = "";
            state.isError = false;
            state.error = action.error.message;
        })
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        }).addCase(loginUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.user.email = payload;
            state.error = "";
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = true;
            state.user.email = "";
            state.isError = false;
            state.error = action.error.message;
        })
        builder.addCase(googleSignIn.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        }).addCase(googleSignIn.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.user.email = payload;
            state.error = "";
        }).addCase(googleSignIn.rejected, (state, action) => {
            state.isLoading = true;
            state.user.email = "";
            state.isError = false;
            state.error = action.error.message;
        })
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        }).addCase(getUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.user = payload;
            state.error = "";
        }).addCase(getUser.rejected, (state, action) => {
            state.isLoading = true;
            state.user.email = "";
            state.isError = false;
            state.error = action.error.message;
        })

    }
});
export const { logout, setUser, toggleLoading } = authSlice.actions
export default authSlice.reducer;