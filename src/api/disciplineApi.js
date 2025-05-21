import { baseApi } from './baseApi'

export const disciplineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDisciplineInfo: builder.query({
      query: (id) => ({
        url: `/disciplines/${id}`,
      }),
    }),

    getCriteriaByDiscipline: builder.query({
      query: (DisciplineId) => ({
        url: `/disciplines/${DisciplineId}/criteria`,
      }),
    }),

    getReviewsByDiscipline: builder.query({
      query: ({ DisciplineId, page = 1, sort = '', sortBy = '' }) => ({
        url: `/disciplines/${DisciplineId}/comments?page=${page}&sort=${sort}&sort_by=${sortBy}`,
      }),
    }),

    sendReview: builder.mutation({
      query: ({ disciplineId, isAnonymous, text, criteria }) => ({
        url: '/reviews',
        method: 'POST',
        body: {
          discipline_id: disciplineId,
          is_anonymous: isAnonymous,
          text,
          criteria,
        },
      }),
    }),
  }),
})

export const {
  useGetDisciplineInfoQuery,
  useGetCriteriaByDisciplineQuery,
  useGetReviewsByDisciplineQuery,
  useSendReviewMutation,
} = disciplineApi
