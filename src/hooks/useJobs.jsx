import axios from "axios";
import { useEffect, useState } from "react";

const useJobs = (sort, search, minSalary, maxSalary) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://job-portal-server-one-pi.vercel.app/jobs?sort=${sort}&search=${search}&min=${minSalary}&max=${maxSalary}`)
            .then(res => {
                setLoading(false);
                setJobs(res.data);
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
                setLoading(false);
            });
    }, [sort, search, minSalary, maxSalary]);

    return { jobs, loading };
};

export default useJobs;
