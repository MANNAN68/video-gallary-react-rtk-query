
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    tagTypes: ["Videos"],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
            providesTags: ["Videos"],
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
        }),
    
        getRelatedVideos: builder.query({
            query: ({id,title}) =>{
                const tags=title.split(" ");
                const likes=tags.map((tag)=>`title_like=${tag}`)
                const quertString=`/videos?${likes.join("&")}&_limit=4`;
                return quertString;
            },
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url:"/videos",
                method:"POST",
                body:data,
            }),
           invalidatesTags:["Videos"]
        }),
        editVideo: builder.mutation({
            query: ({id,data}) => ({
                url:`/videos/${id}`,
                method:"PATCH",
                body:data,
            }),
        //    invalidatesTags:["Videos"]
        }),
    }),
});

export const { useGetVideosQuery,useGetVideoQuery,useGetRelatedVideosQuery,useAddVideoMutation,useEditVideoMutation } = apiSlice;
