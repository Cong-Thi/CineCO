import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  authAPI  from "../services/authAPI";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    messageError: null,
    isLoading: false,
    isOpen: false,
    isOpenRight: false,

    isSignIn : false,
    isSignUp : false,
};

// signin action
export const signin = createAsyncThunk(
    "auth/signin",
    async (user) => {
        try{
            const data = await authAPI.signin(user);
            // Lưu thông tin user xuống localStorage
            localStorage.setItem("user", JSON.stringify(data))
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const signup = createAsyncThunk(
    'auth/signup',
    async (user) => {
        try {
            const {data} = await authAPI.signup(user);
            console.log("data", data.content);
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
        },
        setIsSignUp : (state) => {
            return {...state, isSignUp : false};
        }, 
        clearError : (state) => {
            return {...state, messageError : null}
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

        builder.addCase(signup.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            return {...state, isLoading: false, myAcount: action.payload, isSignUp: true};
        });
        builder.addCase(signup.rejected, (state, action) => {
            return {...state, isLoading: false, myAcount: action.error.message};
        });
    }
});

export const {loginShow, loginClose, logout, show, close, setIsSignUp, clearError} = authSlice.actions;

export default authSlice.reducer;