import { baseApi } from './baseApi'

export const disciplineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDisciplines: builder.query({
      query: ({
        page = 1,
        sortBy = '',
        order = '',
        rating = '',
        modules = '',
        control_type = '',
        discipline_formats = '',
        search = '',
      }) => ({
        url: `/disciplines/?page=${page}&sort_by=${sortBy}&order=${order}&rating=${rating}&module=${modules}&control_type=${control_type}&discipline_format=${discipline_formats}&search=${search}`,
      }),
    }),

    getDisciplineInfo: builder.query({
      query: (id) => ({
        url: `/disciplines/${id}/`,
      }),
    }),

    getReviewsByDiscipline: builder.query({
      query: ({ disciplineId, page = 1, sortBy = '', order = '' }) => ({
        url: `/disciplines/${disciplineId}/reviews/?page=${page}&sort_by=${sortBy}&order=${order}`,
      }),

      providesTags: ['Reviews'],
    }),

    sendReview: builder.mutation({
      query: ({ disciplineId, isAnonymous, text, criteria }) => ({
        url: `/disciplines/${disciplineId}/reviews/`,
        method: 'POST',
        body: {
          anonymous: isAnonymous,
          comment: text,
          criteria,
        },
      }),

      invalidatesTags: ['Reviews'],
    }),

    getModules: builder.query({
      query: () => ({
        url: '/disciplines/modules/',
      }),
    }),
  }),
})

export const {
  useGetDisciplinesQuery,
  useLazyGetDisciplinesQuery,
  useGetDisciplineInfoQuery,
  useGetReviewsByDisciplineQuery,
  useLazyGetReviewsByDisciplineQuery,
  useSendReviewMutation,
  useGetModulesQuery,
} = disciplineApi
