import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Species', 'Individuals', "Groups", "cardInfo", "individualsQuery"],
  endpoints: builder => ({
    getSpecies: builder.query({
      query: () => '/',
      providesTags: ['Species']
    }),
    getSpecificSpeciesInfo: builder.query({
      query: params => `/info/${params.speciesId}`,
      providesTags: ["cardInfo"]
    }),
    getNestedIndividuals: builder.query({
      query: params => `/${params.speciesId}/nested`,
      providesTags: ['Individuals']
    }),
    getQueriedIndividuals: builder.query({
      query: params => encodeURI(`/${params.speciesId}?search=${params.query}`),
      providesTags: ['individualsQuery']
    }),
    getNestedChildrenOfPair: builder.query({
      query: params => encodeURI(`/${params.speciesId}/nested?mother=${params.motherId}&father=${params.fatherId}`),
      providesTags: ['Individuals']
    }),
    getFlatIndividuals: builder.query({
      query: params => encodeURI(`/${params.speciesId}/flat?${params.queryParams}`),
      providesTags: ['Individuals']
    }),
    getSpecificGroupInfo: builder.query({
      query: params => `/info/${params.speciesId}/${params.groupId || "undefined"}`,
      providesTags: ["cardInfo"]
    }),
    getSpecificSpeciesGroups: builder.query({
      query: params => `/${params.speciesId}/group`,
      providesTags: ['Groups']
    }),
    getSpecificGroupIndividuals: builder.query({
      query: params => `/${params.speciesId}/group/${params.groupId}`,
      providesTags: ['Individuals']
    }),
    getSpecficIndividualInfo: builder.query({
      query: params => `/info/${params.speciesId}/${params.groupId || "undefined"}/${params.individualId || "undefined"}`,
      providesTags: ["cardInfo"]
    }),

    createSpecies: builder.mutation({
      query: speciesInfo => ({
        url: `/`,
        method: 'POST',
        body: speciesInfo.form
      }),
      invalidatesTags: ["Species"]
    }),
    createSpeciesIndividual: builder.mutation({
      query: individualInfo => ({
        url: `/${individualInfo.params.speciesId}/${individualInfo.params.groupId || "undefined"}`,
        method: 'POST',
        body: individualInfo.form
      }),
      invalidatesTags: ["Individuals", "cardInfo"]
    }),
    createSpeciesGroup: builder.mutation({
      query: groupInfo => ({
        url: `/${groupInfo.params.speciesId}/group`,
        method: 'POST',
        body: groupInfo.form
      }),
      invalidatesTags: ["Groups", "cardInfo"]
    }),
    editSpecies: builder.mutation({
      query: speciesInfo => ({
        url: `/${speciesInfo.params.speciesId}`,
        method: 'PATCH',
        body: speciesInfo.form
      }),
      invalidatesTags: ["cardInfo", "Species"]
    }),
    editSpeciesIndividual: builder.mutation({
      query: individualInfo => ({
        url: `/${individualInfo.params.speciesId}/${individualInfo.params.individualId}`,
        method: 'PATCH',
        body: individualInfo.form
      }),
      invalidatesTags: ["cardInfo", "Individuals"]
    }),
    editSpeciesGroup: builder.mutation({
      query: groupInfo => ({
        url: `/${groupInfo.params.speciesId}/group/${groupInfo.params.groupId}`,
        method: 'PATCH',
        body: groupInfo.form
      }),
      invalidatesTags: ["cardInfo", "Groups"]
    }),

    deleteSpecies: builder.mutation({
      query: speciesInfo => ({
        url: `/${speciesInfo.params.speciesId}`,
        method: 'DELETE',
        body: speciesInfo.form
      }),
      invalidatesTags: ["Species"]
    }),
    deleteSpeciesIndividual: builder.mutation({
      query: individualInfo => ({
        url: `/${individualInfo.speciesId}/${individualInfo.individualId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Individuals"]
    }),
    deleteSpeciesGroup: builder.mutation({
      query: groupInfo => ({
        url: `/${groupInfo.speciesId}/group/${groupInfo.groupId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Groups"]
    }),
  })
})

export const {
  useGetSpeciesQuery,
  useGetQueriedIndividualsQuery,
  useGetSpecificSpeciesInfoQuery,
  useGetNestedIndividualsQuery,
  useGetNestedChildrenOfPairQuery,
  useGetFlatIndividualsQuery,
  useGetSpecificSpeciesGroupsQuery,
  useGetSpecificGroupIndividualsQuery,
  useGetSpecificGroupInfoQuery,
  useGetSpecficIndividualInfoQuery,
  useCreateSpeciesGroupMutation,
  useCreateSpeciesIndividualMutation,
  useCreateSpeciesMutation,
  useEditSpeciesGroupMutation,
  useEditSpeciesIndividualMutation,
  useEditSpeciesMutation,
  useDeleteSpeciesGroupMutation,
  useDeleteSpeciesIndividualMutation,
  useDeleteSpeciesMutation
} = apiSlice