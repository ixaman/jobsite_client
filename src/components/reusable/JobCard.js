import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useApplicationStatusMutation,
  useRemoveJobByIdMutation,
} from "../../features/job/jobApi";

const JobCard = ({ jobData }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { _id, position, companyName, location, employmentType, applicants } =
    jobData || {};
  const [removeJob] = useRemoveJobByIdMutation();
  const loca = useLocation();
  const [changeStatus] = useApplicationStatusMutation();

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this Job ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeJob(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleApprove = (uId, jId) => {
    const data = {
      status: "Approved",
      userId: uId,
      jobId: jId,
    };
    changeStatus(data);
    toast.success("status approved !", {
      duration: 1000,
    });
  };

  const handleReject = (uId, jId) => {
    const data = {
      status: "Rejected",
      userId: uId,
      jobId: jId,
    };
    changeStatus(data);
    toast.error("status rejected !", {
      duration: 1000,
    });
  };

  return (
    <div
      key={_id}
      className="border border-gray-300 shadow-xl mb-5 p-5 rounded-2xl text-primary"
    >
      <div className="flex justify-between  text-primary">
        <div>
          <p className="text-xl">{position}</p>
          <small className="text-primary/70 ">
            by{" "}
            <span className="font-semibold hover:text-primary cursor-pointer hover:underline transition-all">
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
      </div>
      <div className="flex justify-between items-center mt-5">
        {!loca.pathname.includes("applicants") && <p>{employmentType}</p>}
        {user.role === "employer" && loca.pathname.includes("applicants") && (
          <span className=" text-primary">
            <p className="mb-4 font-semibold">Applied: {applicants?.length}</p>
            <table className="border-separate rounded-2xl border-spacing-10 bg-primary/10">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map(({ email, status, id }) => (
                  <tr>
                    <td>{email}</td>
                    <td>{status}</td>
                    <td>
                      <button
                        className="btn"
                        disabled={status === "Approved"}
                        onClick={() => handleApprove(id, _id)}
                      >
                        Approve
                      </button>{" "}
                      <button
                        className="btn"
                        disabled={status === "Rejected"}
                        onClick={() => handleReject(id, _id)}
                      >
                        Reject
                      </button>
                    </td>
                    <td>
                      <Link
                        className="btn"
                        // to={path}
                      >
                        see details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            ​
          </span>
        )}
        {!loca.pathname.includes("applicants") && (
          <button
            className="btn"
            onClick={() => navigate(`/job-details/${_id}`)}
          >
            Details
          </button>
        )}
        {user.role === "employer" && !loca.pathname.includes("applicants") && (
          <button className="btnSecondary" onClick={() => handleDelete(_id)}>
            Remove Post
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
