import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://order-management-mb7d.onrender.com",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log("args", args)
    // console.log("api", api)

    let result = await baseQuery(args, api, extraOptions)
    // console.log(`result`, result)

    if (result?.error?.status === 403) {
        // console.log("sending refresh token")

        // Send refresh token to get new access token
        const refreshResult = await baseQuery("/api/auth/refresh", api, extraOptions)
        // console.log("refreshResult", refreshResult)

        if (refreshResult?.data) {
            const userId = api.getState().auth.userId

            // Store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, userId }))
            // Retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})