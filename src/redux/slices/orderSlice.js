import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const fetchOrders = createAsyncThunk("orders/fetchOrders", async (accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
    };
    const response = await axios.get("/api/orders", config);
    return response.data;
});

const orderSlice = createSlice({
    name: "orders",
    initialState: { data: [], loading: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = "loading";
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error.message;
            });
    },
});

export { fetchOrders };
export default orderSlice.reducer;
