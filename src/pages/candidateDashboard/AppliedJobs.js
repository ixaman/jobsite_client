import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(email);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1
        className="my-6 text-lg
       font-semibold text-primary
       "
      >
        Applied jobs
      </h1>
      <div className="grid grid-cols-2 gap-5 pb-5">
        {data?.data?.map((job, index) => (
          <JobCard jobData={job} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
