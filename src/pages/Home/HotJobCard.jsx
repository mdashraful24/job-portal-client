import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const HotJobCard = ({ job }) => {
    const {
        _id,
        title,
        location,
        jobType,
        category,
        company,
        company_logo,
        applicationDeadline,
        salaryRange,
        description,
        requirements = [] // Fallback to an empty array
    } = job || {}; // Handle the case where `job` is undefined

    return (
        <div className="card card-compact bg-blue-50 shadow-xl transition-transform duration-500 hover:-translate-y-2 group">
            <div className="flex gap-2 m-2">
                <figure>
                    <img
                        className="w-16"
                        src={company_logo || 'default-logo.png'} // Provide a fallback for `company_logo`
                        alt="Company Logo"
                    />
                </figure>
                <div>
                    <h4 className="text-2xl">{company || 'Unknown Company'}</h4> {/* Handle undefined `company` */}
                    <p className="flex gap-1 items-center">
                        <FaMapMarkerAlt /> {location || 'Location not specified'}
                    </p>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{title || 'Job Title Unavailable'}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{description || 'No description provided.'}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {requirements.map((skill, index) => (
                        <p
                            key={index}
                            className="border rounded-md text-center px-2 hover:text-purple-700 hover:bg-gray-400"
                        >
                            {skill}
                        </p>
                    ))}
                </div>
                <div className="card-actions justify-end items-center mt-4">
                    <p className="flex items-center">
                        Salary: <FaDollarSign />
                        {salaryRange?.min || 'N/A'} - {salaryRange?.max || 'N/A'}
                        {salaryRange?.currency?.toUpperCase() || ''}
                    </p>
                    <Link to={`/jobs/${_id || ''}`}>
                        <button className="btn shadow-md transition-colors duration-300 bg-blue-50 text-black group-hover:bg-blue-600 group-hover:text-white">
                            Apply
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotJobCard;
