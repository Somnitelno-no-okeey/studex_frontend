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
  }),
})

export const { useGetDisciplineInfoQuery, useGetCriteriaByDisciplineQuery } =
  disciplineApi
