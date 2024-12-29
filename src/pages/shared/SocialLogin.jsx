import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {
            // console.log(result.user)
            navigate(location?.state ? location.state : "/")
        })
        .catch(error => {
            // console.log(error.message)
        })
    }

    return (
        <div className="px-8 pb-8">
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className="btn btn-accent w-full">Google</button>
        </div>
    );
};

export default SocialLogin;