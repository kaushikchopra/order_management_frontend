import { apiSlice } from "./apiSlice";
import { logOut, setCredentials } from "./authSlice";

// Login Slice
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/api/auth/login",
                method: "POST",
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: "/api/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    // const { data } =
                    await queryFulfilled
                    // console.log("cookie set to null", data);
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (error) {
                    console.log(error)

                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "/api/auth/refresh",
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { userId, accessToken } = data
                    // console.log("newAccessToken",accessToken)
                    dispatch(setCredentials({ userId, accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice