import Lottie from "lottie-react";
import signIn from '../../assets/signIn.json'
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const SignIn = () => {
    const { signInUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    // const from = location.state || "/";

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        signInUser(email, password)
            .then(result => {
                // console.log('sign in', result.user.email);
                const user = { email: result.user.email };
                axios.post('https://job-portal-server-one-pi.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        // console.log(res.data);
                    })
                // navigate(from)
                navigate(location?.state ? location.state : "/")
            })
            .catch(error => {
                // console.log(error.message)
            })
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse gap-8">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={signIn}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="text-center lg:text-left p-5">
                        <h1 className="text-5xl text-center font-bold">Login now!</h1>
                    </div>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="password"
                                className="input input-bordered" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-[52px]">
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </button>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p className="text-center text-sm mb-4">
                        Already Have An Account? <Link to="/register" className="text-red-500 font-semibold hover:underline">Login</Link>
                    </p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default SignIn;