import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    jobPost: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/job",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    applyPost: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/apply",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getJobs: builder.query({
      query: () => ({
        method: "GET",
        url: "/jobs",
      }),
      providesTags: ["Jobs", "status"],
    }),
    getAppliedJobs: builder.query({
      query: (email) => ({
        method: "GET",
        url: `applied-jobs/${email}`,
      }),
    }),
    getJobById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/job/${id}`,
      }),
      providesTags: ["Qna"],
    }),
    removeJobById: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/delete-job/${id}`,
      }),
      invalidatesTags: ["Jobs"],
    }),
    qustions: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/query",
        body: data,
      }),
      invalidatesTags: ["Qna"],
    }),
    reply: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/reply",
        body: data,
      }),
      invalidatesTags: ["Qna"],
    }),
    applicationStatus: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/application-status",
        body: data,
      }),
      invalidatesTags: ["status"],
    }),
  }),
});

export const {
  useJobPostMutation,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useApplyPostMutation,
  useGetAppliedJobsQuery,
  useQustionsMutation,
  useReplyMutation,
  useRemoveJobByIdMutation,
  useApplicationStatusMutation,
} = jobApi;
