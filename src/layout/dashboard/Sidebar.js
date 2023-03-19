import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const employerRoutes = [
    {
      routeName: "All Jobs",
      path: "all-jobs",
    },
    {
      routeName: "Add Job",
      path: "add-job",
    },
    {
      routeName: "Job applications",
      path: "applicants",
    },
    {
      routeName: "Applicant Details",
      path: "applicant-details",
    },
  ];
  const candidateRoutes = [
    {
      routeName: "Applied Jobs",
      path: "applied-jobs",
    },
  ];
  return (
    <div className="bg-primary/10 col-span-2 h-screen sticky top-0">
      <ul className="flex flex-col gap-2 w-full h-full  p-3">
        <div className="flex justify-between items-center text-primary my-1">
          <Link to="/" className="flex items-center">
            <FaChevronLeft />
            <h1>Back</h1>
          </Link>
          <h1 className="text-xl">Dashboard</h1>
        </div>
        <li>
          {user.role === "employer" &&
            employerRoutes.map(({ routeName, path }) => (
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block my-3 rounded-md py-2 px-3"
                to={path}
              >
                {routeName}
              </Link>
            ))}
          {user.role === "candidate" &&
            candidateRoutes.map(({ routeName, path }) => (
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                to={path}
              >
                {routeName}
              </Link>
            ))}
        </li>{" "}
        <br></br>
      </ul>
    </div>
  );
};

export default Sidebar;
