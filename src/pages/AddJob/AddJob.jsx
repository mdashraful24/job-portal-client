import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddJob = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddJob = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData.entries());
        const initialData = Object.fromEntries(formData.entries());
        // console.log(initialData);
        const { min, max, currency, ...newJob } = initialData;
        // console.log(newJob);
        newJob.salaryRange = { min, max, currency }
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n');
        // console.log(newJob);

        // client send data from backend
        fetch('http://localhost:5000/jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newJob)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Job has been added.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myPostedJobs');
                }
            })
    }

    return (
        <div>
            <h2 className="text3xl">Post a new Job.</h2>
            <form onSubmit={handleAddJob} className="card-body">
                {/* Job title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Title</span>
                    </label>
                    <input type="text" name="title" placeholder="Job Title" className="input input-bordered" required />
                </div>
                {/* Job location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Location</span>
                    </label>
                    <input type="text" name="location" placeholder="Job Location" className="input input-bordered" required />
                </div>
                {/* Job type */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Type</span>
                    </label>
                    <select defaultValue="Pick a Job type" className="select select-ghost w-full max-w-xs">
                        <option disabled>Pick a Job type</option>
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Intern</option>
                    </select>
                </div>
                {/* Job Field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Field</span>
                    </label>
                    <select defaultValue="Pick a Job Field" className="select select-ghost w-full max-w-xs">
                        <option disabled>Pick a Job Field</option>
                        <option>Engineering</option>
                        <option>Finance</option>
                        <option>Teaching</option>
                        <option>Marketing</option>
                    </select>
                </div>
                {/* Salary range */}
                <div className="grid grid-cols-1 lg:grid-cols-3 items-end gap-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Salary Range</span>
                        </label>
                        <input type="text" name="min" placeholder="Job Location" className="input input-bordered" required />
                    </div>
                    <div>
                        <input type="text" name="max" placeholder="Job Location" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <select defaultValue="Pick a Currency" name="currency" className="select select-ghost w-full max-w-xs">
                            <option disabled>Pick a Currency</option>
                            <option>BDT</option>
                            <option>USD</option>
                            <option>INR</option>
                        </select>
                    </div>
                </div>
                {/* Job description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Description</span>
                    </label>
                    <textarea className="textarea textarea-bordered resize-none" name="description" placeholder="Job Description" required></textarea>
                </div>
                {/* Company Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Name</span>
                    </label>
                    <input type="text" name="company" placeholder="Company Name" className="input input-bordered" required />
                </div>
                {/* Job requirements */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Requirements</span>
                    </label>
                    <textarea className="textarea textarea-bordered resize-none" name="requirements" placeholder="Put each requirements in a new line" required></textarea>
                </div>
                {/* Job responsibilities */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Responsibilities</span>
                    </label>
                    <textarea className="textarea textarea-bordered resize-none" name="responsibilities" placeholder="Write each responsibilities in a new line" required></textarea>
                </div>
                {/* HR Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Name</span>
                    </label>
                    <input type="text" name="hr_name" placeholder="HR Name" className="input input-bordered" required />
                </div>
                {/* HR Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Email</span>
                    </label>
                    <input type="email" defaultValue={user?.email || ""} readOnly name="hr_email" placeholder="HR Email" className="input input-bordered cursor-not-allowed" required />
                </div>
                {/* applicationDeadline */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Application Deadline</span>
                    </label>
                    <input type="date" name="applicationDeadline" placeholder="Deadline" className="input input-bordered" required />
                </div>
                {/* Company Logo URL */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Logo URL</span>
                    </label>
                    <input type="text" name="company_logo" placeholder="Company Logo URL" className="input input-bordered" required />
                </div>
                {/* Submit button */}
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;