import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../services/authAPI";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    isLoading: false,
    isOpen: false,
    isOpenRight: false,
};

// signin action
export const signin = createAsyncThunk(
    "auth/signin",
    async (values) => {
        try{
            const data = await authAPI.signin(values);
            // Lưu thông tin user xuống localStorage
            localStorage.setItem("user", JSON.stringify(data))
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const signUp = createAsyncThunk(
    'auth/signup',
    async (user) => {
        try {
            const {data} = await authAPI.signUp(user);
            return data.content;
        } catch (error) {
            throw(error);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("user");
            return {...state, user: null};
        },
        loginShow : (state) => {
            return {...state, isOpen : true}
        },
        loginClose : (state) => {
            return {...state, isOpen : false}
        },
        show : (state) => {
            return {...state, isOpenRight: true}
        },
        close : (state) => {
            return {...state, isOpenRight: false}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signin.pending, (state, action) => {
            return {...state, loading: true};
        });

        builder.addCase(signin.fulfilled, (state, action) => {
            return {...state, loading: false, user: action.payload};
        });

        builder.addCase(signin.rejected, (state, action) => {
            return {...state, loading: false, error: action.error.message};
        });

        builder.addCase(signUp.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            return {...state, isLoading: false, myAcount: action.payload};
        });
        builder.addCase(signUp.rejected, (state, action) => {
            return {...state, isLoading: false, myAcount: action.error.message};
        });
    }
});

export const {loginShow, loginClose, logout, show, close} = authSlice.actions;

export default authSlice.reducer;