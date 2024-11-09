import { StaffLoginDto } from '@/services/interface';
import { AuthOperation, StaffOperation } from '@/services/main';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setTokenInCookie, getTokenFromCookie, removeTokenFromCookie } from '@/utils/token';

const initialState: AuthState = {
    isAuthenticated: false,
    userInfo: null,
    error: null,
    loading: false,
};

export const login = createAsyncThunk<StaffInfo, StaffLoginDto, { rejectValue: RejectedValue }>(
    'auth/login',
    async (payload, { rejectWithValue }) => {
        try {
            const authOp = new AuthOperation();
            const response = await authOp.loggedInByStaff(payload);
            if (response.success) {
                setTokenInCookie("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0OWIwNmY3LTY2MzEtNDczMS1iMDk5LTQ4MDMwOTA2Y2M1MCIsInJvbGVzIjpbIkFETUlOIiwiU0hJUFBFUiJdLCJhZ2VuY3lJZCI6bnVsbCwic3RhZmZJZCI6bnVsbCwiaWF0IjoxNzMwNTM0NzI3LCJleHAiOjE3MzQxMzQ3Mjd9.NPk2gBSatuXqrDzwIV0LP2KDrAZxdXzGWtgxlZldz1s");
                return response.data as StaffInfo;
            } else {
                return rejectWithValue(response.message);
            }
        } catch (error) {
            return rejectWithValue(error as RejectedValue);
        }
    }
);

export const fetchUserInfo = createAsyncThunk<StaffInfo, void, { rejectValue: RejectedValue }>(
    'auth/fetchUserInfo',
    async (_, { rejectWithValue }) => {
        const token = getTokenFromCookie();
        if (!token) {
            return rejectWithValue('No token found');
        }
        try {
            const staffOp = new StaffOperation();
            const response = await staffOp.getInfo(token);
            if (response.success) {
                return response.data as StaffInfo;
            } else {
                return rejectWithValue(response.message);
            }
        } catch (error) {
            return rejectWithValue(error as RejectedValue);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.userInfo = null;
            state.error = null;
            removeTokenFromCookie();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<StaffInfo>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.userInfo = action.payload;
            })
            .addCase(login.rejected, (state, action: PayloadAction<RejectedValue>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<StaffInfo>) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchUserInfo.rejected, (state, action: PayloadAction<RejectedValue>) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;