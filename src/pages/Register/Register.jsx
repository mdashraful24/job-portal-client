import Lottie from "lottie-react";
import registerLottieData from '../../assets/lottie.json'
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // password validation
        const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        // Correct method is `test`, not `text`
        if (!passwordValidation.test(password)) {
            alert("Password must be at least 6 characters long and include at least one uppercase and one lowercase letter.");
            return; // Stop further form processing if invalid
        }
        // console.log(email, password);

        createUser(email, password)
            .then(result => {
                // console.log(result.user);
                navigate(location?.state ? location.state : "/")
            })
            .catch(error => {
                // console.log(error.message);
            })
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={registerLottieData}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="text-center lg:text-left p-5">
                        <h1 className="text-5xl text-center font-bold">Register now!</h1>
                    </div>
                    <form onSubmit={handleRegister} className="card-body">
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
                                type={!showPassword ? "text" : "password"}
                                name="password"
                                placeholder="password"
                                className="input input-bordered" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[52px]">
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }</button>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p className="text-center text-sm mb-4">
                        Already Have An Account? <Link to="/signIn" className="text-red-500 font-semibold hover:underline">Login</Link>
                    </p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;