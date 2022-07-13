import { BiShow, GiWindSlap, MdOutlineKeyboardArrowRight } from "../../icons";
import "./index.css";
import { useState, useRef } from "react";
import { CREDENTIALS, ERROR, PATHS } from "../../config/constants";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { loginUser, signupUser } from "../../networkCalls";
import { useAuthProvider } from "../../Contexts";
import { useNotifyUser } from "../../Contexts";

function LoginRoute() {
  const navigate = useNavigate();
  const { toast } = useNotifyUser();
  const location = useLocation();
  const { setLogin } = useAuthProvider();

  // new data
  const [validatedCredentials, validteCredentials] = useState({
    email: false,
    password: false,
  });
  const [testCredentials, setTestCredentials] = useState(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const submitLoginForm = async (e) => {
    e.preventDefault();
    if (emailInput.current.value === "" && passwordInput.current.value !== "")
      validteCredentials({ email: true, password: false });
    else if (
      passwordInput.current.value === "" &&
      emailInput.current.value !== ""
    )
      validteCredentials({ email: false, password: true });
    else if (
      passwordInput.current.value === "" &&
      emailInput.current.value === ""
    )
      validteCredentials({ email: true, password: true });
    else {
      try {
        const loginResponse = await loginUser({
          email: emailInput.current.value,
          password: passwordInput.current.value,
        });
        setLogin(true);
        navigate(location.state?.from?.pathname ?? "/", { replace: true });
      } catch (e) {
        // validteCredentials({ email: null, password: null });
        emailInput.current.value = "";
        passwordInput.current.value = "";
        setTestCredentials({
          tesetEmail: "adarshbalika@gmail.com",
          testPassword: "adarshBalika1234",
        });
        if (e.response.status === 401) {
          toast.error("Invalid email or password. Please try again.");
        } else if (e.response.status === 404) {
          toast.error("No user found with this email. Please try again.");
        } else {
          toast.error("Unexpected error. Please try again in some time.");
        }
      }
    }
  };

  return (
    <div className="auth-form">
      <h1>
        Spark Wind <GiWindSlap className="hero-icon" />
      </h1>
      <form onSubmit={submitLoginForm}>
        <center>
          <h2>Login</h2>
        </center>
        <div>
          <label>Email address</label>
          <input
            type="email"
            placeholder="email"
            ref={emailInput}
            value={testCredentials && testCredentials.tesetEmail}
            onChange={() =>
              validteCredentials((prev) => ({
                ...prev,
                email: false,
              }))
            }
          />
          {validatedCredentials.email && (
            <p className="style-error">Please Provide Email</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            ref={passwordInput}
            value={testCredentials && testCredentials.testPassword}
            onChange={() =>
              validteCredentials((prev) => ({
                ...prev,
                password: false,
              }))
            }
          />
          {validatedCredentials.password && (
            <p className="style-error">Please Provide password</p>
          )}
        </div>
        <button className="primary-cta">Login</button>
        <button
          className="primary-cta"
          onClick={() =>
            setTestCredentials({
              tesetEmail: "balajinarayana@gmail.com",
              testPassword: "balajinarayana123",
            })
          }
        >
          Test Login
        </button>
        <NavLink to={PATHS.SIGNUP}>
          <div className="account-info">
            <p>Create New Acccount</p>
            <MdOutlineKeyboardArrowRight className="icon" />
          </div>
        </NavLink>
      </form>
    </div>
  );
}

 function SignupRoute() {
  const navigate = useNavigate();
  const { setLogin } = useAuthProvider();
  const { toast } = useNotifyUser();
  const location = useLocation();
  let intialDetials = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    displayname: "",
  };
  const [detials, setDetials] = useState(intialDetials);
  const submitSignupForm = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      displayname,
    } = detials;

    if(firstName===""){
          toast.error("Please Provide FirstName!");
    }
    else if (lastName==="") {
      toast.error("Please Provide LastName!");
    } else if (email==="") {
    toast.error("Please Provide email!");
    }
    else if (password.length < 6) {
      toast.error("password must be atleast 6 charecters long");
      setDetials((predDetials) => ({
        ...predDetials,
        password: "",
        confirmPassword: "",
      }));
    }  else if (password.search(/\d/) === -1) {
      toast.error("Password must contain at least one number!");
      setDetials((predDetials) => ({
        ...predDetials,
        password: "",
        confirmPassword: "",
      }));
    } else if (password.search(/[a-z]/) === -1) {
      toast.error("Password must contain at least one lowercase letter!");
      
      setDetials((predDetials) => ({
        ...predDetials,
        password: "",
        confirmPassword: "",
      }));
    } else if (password.search(/[A-Z]/) === -1) {
      toast.error("Password must contain at least one Uppercase letter!");
      
      setDetials((predDetials) => ({
        ...predDetials,
        password: "",
        confirmPassword: "",
      }));
    } else if (password !== confirmPassword) {
      setDetials((predDetials) => ({
        ...predDetials,
        password: "",
        confirmPassword: "",
      }));
      toast.error("Password must contain at least one Uppercase letter!");
    } else {
      try {
        const signupResponse = await signupUser({
          firstName: detials.firstName,
          lastName: detials.lastName,
          email: detials.email,
          password: detials.password,
          displayname: detials.displayname,
        });
        toast.success("Account created successfully!");
        setLogin(true);
        navigate(location.state?.from?.pathname ?? "/", { replace: true });
      } catch (e) {
        if (e.response.status === 422) {
          toast.error("Account already exists");
          setDetials(intialDetials);
        } else {
          toast.error("Unexpected error");
        }
      }
    }
  };

  const setDetialsHandler = (e) => {
    if (e.target.name !== "termsAndConditions")
      setDetials((prevCredentials) => ({
        ...prevCredentials,
        [e.target.name]: e.target.value,
      }));
    else
      setDetials((prevCredentials) => ({
        ...prevCredentials,
        [e.target.name]: e.target.checked,
      }));
  };

  return (
    <div className="auth-form">
      <h1>
        Spark Library <GiWindSlap className="hero-icon" />
      </h1>
      <form onSubmit={submitSignupForm}>
        <center>
          <h2>Signup</h2>
        </center>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="name"
            name="firstName"
            onChange={setDetialsHandler}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="name"
            name="lastName"
            onChange={setDetialsHandler}
          />
        </div>
        <div>
          <label>Email address</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={setDetialsHandler}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            name="password"
            onChange={setDetialsHandler}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="********"
            name="confirmPassword"
            onChange={setDetialsHandler}
          />
        </div>
        <button className="primary-cta cursor-pointer" id="cta">
          Signup
        </button>
        <NavLink to="/user/login">
          <div className="account-info">
            <p>Already have an account</p>
            <MdOutlineKeyboardArrowRight className="icon" />
          </div>
        </NavLink>
      </form>
    </div>
  );
}

export { LoginRoute, SignupRoute };
