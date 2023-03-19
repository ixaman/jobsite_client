import React from "react";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetJobsQuery } from "../../features/job/jobApi";

const ApplicantsList = () => {
  const { data, isLoading } = useGetJobsQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1
        className="my-6 ml-3 text-lg
       font-semibold text-primary
       "
      >
        Applicants by job
      </h1>
      <div className="mx-2">
        {data?.data?.map((job, index) => (
          <JobCard jobData={job} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ApplicantsList;
