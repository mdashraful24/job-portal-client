import { Link, useLoaderData } from "react-router-dom";

const JobDetails = () => {
    const { _id, title, company, location, jobType, category, applicationDeadline, salaryRange, description, requirements, responsibilities, status, hr_email, hr_name, company_logo } = useLoaderData()

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-6">
                    <img src={company_logo} alt={`${company} Logo`} className="w-20 h-20 rounded-full" />
                    <div>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <h2 className="text-xl text-gray-600">{company}</h2>
                        <p className="text-sm text-gray-500">{location}</p>
                    </div>
                </div>

                {/* Job Overview Section */}
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Job Overview</h3>
                    <p className="text-gray-700">{description}</p>
                </div>

                {/* Job Details Section */}
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Details</h3>
                    <ul className="text-gray-700">
                        <li><strong>Job Type:</strong> {jobType}</li>
                        <li><strong>Category:</strong> {category}</li>
                        <li><strong>Application Deadline:</strong> {applicationDeadline}</li>
                        <li><strong>Status:</strong> {status}</li>
                        <li>
                            <strong>Salary Range:</strong> {salaryRange.min} - {salaryRange.max} {salaryRange.currency.toUpperCase()}
                        </li>
                    </ul>
                </div>

                {/* Requirements Section */}
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Requirements</h3>
                    <ul className="list-disc ml-5 text-gray-700">
                        {requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>

                {/* Responsibilities Section */}
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Responsibilities</h3>
                    <ul className="list-disc ml-5 text-gray-700">
                        {responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                        ))}
                    </ul>
                </div>

                {/* HR Contact Section */}
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">HR Contact</h3>
                    <p className="text-gray-700">
                        <strong>Name:</strong> {hr_name}
                    </p>
                    <p className="text-gray-700">
                        <strong>Email:</strong> <a href={`mailto:${hr_email}`} className="text-blue-600">{hr_email}</a>
                    </p>
                </div>

                {/* Buttons Section */}
                <div className="flex items-center gap-5 mt-6">
                    <Link to={`/jobApply/${_id}`} className="btn bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                        Apply Now
                    </Link>
                    <button className="btn bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition">
                        Save Job
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;