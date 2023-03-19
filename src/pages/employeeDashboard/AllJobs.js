import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetJobsQuery } from "../../features/job/jobApi";

const AllJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
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
        Available Jobs
      </h1>
      <div className="grid grid-cols-2 gap-5 pb-5">
        {data?.data?.map((job, index) => (
          <JobCard jobData={job} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
