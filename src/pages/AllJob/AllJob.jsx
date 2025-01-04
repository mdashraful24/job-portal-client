import { useState } from "react";
import useJobs from "../../hooks/useJobs";
import HotJobCard from "../Home/HotJobCard";
import { BiSearch } from "react-icons/bi";

const AllJob = () => {
    const [sort, setSort] = useState(false);
    const [search, setSearch] = useState("");
    const [minSalary, seMinSalary] = useState("");
    const [maxSalary, seMaxSalary] = useState("");
    const { jobs, loading } = useJobs(sort, search, minSalary, maxSalary);

    if (loading) {
        return <h2>Job is Loading</h2>;
    }

    return (
        <div className="pb-14">
            <h1 className="text-4xl font-bold text-center mb-8">All Jobs</h1>

            <div className="w-11/12 mx-auto bg-base-200 py-5 p-3 flex items-center gap-5">
                <button onClick={() => setSort(!sort)} className={`btn btn-neutral ${sort && "btn-success"}`}>
                    {sort === true ? "Sorted by Salary" : "Sort by Salary"}
                </button>

                {/* Location Search */}
                <BiSearch />
                <input
                    onKeyUp={(e) => setSearch(e.target.value)}
                    type="text"
                    className="input w-full max-w-2xl"
                    placeholder="Search Jobs by Location"
                />

                <div className="space-y-3">
                    {/* Min Salary Search */}
                    <input
                        onKeyUp={(e) => seMinSalary(e.target.value)}
                        type="text"
                        className="input w-full max-w-xs"
                        placeholder="Search Jobs by Min Salary"
                    />

                    {/* Max Salary Search */}
                    <input
                        onKeyUp={(e) => seMaxSalary(e.target.value)}
                        type="text"
                        className="input w-full max-w-xs"
                        placeholder="Search Jobs by Max Salary"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    jobs.map(job => <HotJobCard key={job._id} job={job} />)
                }
            </div>
        </div>
    );
};

export default AllJob;
