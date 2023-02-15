import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fakeBaseQuery({
        baseUrl: process.env.REACT_APP_DEV_URL,
    }),
    endpoints: (builder) => ({}),
})

export default apiSlice