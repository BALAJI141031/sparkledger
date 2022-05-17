import { BiShow, GiWindSlap, MdOutlineKeyboardArrowRight } from "../../icons";
import "./index.css";
import { useState, useRef } from "react";
import { CREDENTIALS, ERROR, PATHS } from "../../config/constants";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { loginUser, signupUser } from "../../networkCalls";
import { useAuthProvider } from "../../Contexts";
import { useNotifyUser } from "../../Contexts";

function LoginRoute() {
  // const [credentials, setCredentials] = useState({
  //   email: null,
  //   password: null,
  //   emailError: null,
  //   passwordError: null,
  // });
  const navigate = useNavigate();
  const { toast } = useNotifyUser();
  const location = useLocation();
  const { setLogin } = useAuthProvider();
  // const [passwordType, setPasswordType] = useState(true);
  // handle login

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

  // const handleAuth = () => {
  //   if (
  //     ((credentials.email === "" || credentials.email === null) &&
  //       credentials.password === "") ||
  //     credentials.password === null
  //   ) {
  //     if (credentials.email === "" || credentials.email === null)
  //       setCredentials({
  //         email: null,
  //         password: null,
  //         emailError: ERROR.EMPTY_EMAIL,
  //         passwordError: null,
  //       });

  //     if (credentials.password === "" || credentials.password === null)
  //       setCredentials((prevState) => ({
  //         ...prevState,
  //         passwordError: ERROR.EMPTY_PASSWORD,
  //       }));
  //   } else {
  //     (async () => {
  //       try {
  //         const loginResponse = await loginUser({
  //           email: credentials.email,
  //           password: credentials.password,
  //         });
  //         setLogin(true);
  //         navigate(location.state?.from?.pathname ?? "/", { replace: true });
  //         setCredentials({ email: null, password: null });
  //       } catch (e) {
  //         if (e.response.status === 401) {
  //           setCredentials((prevState) => ({
  //             ...prevState,
  //             passwordError: ERROR.PASSWORD_ERROR,
  //           }));
  //         }
  //         if (e.response.status === 404) {
  //           setCredentials((prevState) => ({
  //             ...prevState,
  //             emailError: ERROR.EMAIL_ERROR,
  //           }));
  //         } else {
  //         }
  //       }
  //     })();
  //   }
  // };

  return (
    //   <div className="flex-H-center-H">
    //     <div className="auth-form">
    //       <h2 className="text-align-center">Login</h2>
    //       <div className="email-div">
    //         <label>Email</label>
    //         <input
    //           value={credentials.email}
    //           onChange={(e) =>
    //             setCredentials((prev) => ({
    //               ...prev,
    //               email: e.target.value,
    //               emailError: null,
    //             }))
    //           }
    //         />
    //         {credentials.emailError && <p>{credentials.emailError}</p>}
    //       </div>
    //       <div className="password-div">
    //         <label>Password</label>
    //         <div className="rel-pos">
    //           <input
    //             type={passwordType && "password"}
    //             value={credentials.password}
    //             onChange={(e) =>
    //               setCredentials((prev) => ({
    //                 ...prev,
    //                 password: e.target.value,
    //                 passwordError: null,
    //               }))
    //             }
    //           />
    //           <BiShow
    //             className="input-icon"
    //             onClick={() => setPasswordType((type) => !type)}
    //           />
    //         </div>
    //         {credentials.passwordError && <p>{credentials.passwordError}</p>}
    //       </div>
    //       <button className="btn primary-icon-btn" id="cta" onClick={handleAuth}>
    //         Login
    //       </button>
    //       <button
    //         className="btn primary-icon-btn"
    //         id="cta"
    //         onClick={() => {
    //           setCredentials({
    //             email: CREDENTIALS.USER_NAME,
    //             password: CREDENTIALS.PASSWORD,
    //           });
    //         }}
    //       >
    //         Bot
    //       </button>
    //     </div>
    //   </div>
    // );
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
        <div className="flex-H-space-bw">
          <div className="flex-H-center-V">
            <input type="checkbox" className="checkbox" />
            <p>Remember Me</p>
          </div>
          <p>Forgot Your Password</p>
        </div>

        <button className="primary-cta">Login</button>

        <button
          className="primary-cta"
          onClick={() =>
            setTestCredentials({
              tesetEmail: "adarshbalika@gmail.com",
              testPassword: "adarshBalika123",
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
  const { toast } = useNotifyUser();
  const navigate = useNavigate();
  // const location = useLocation();
  const { setLogin } = useAuthProvider();
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
    fullName: null,
    confirmPassword: null,
  });
  const singupHandler = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password && credentials.fullName) {
      if (credentials.password !== credentials.confirmPassword) {
        toast.warning(ERROR.PASSWORD_MATCH_ERROR, {
          autoClose: 1200,
        });
      } else {
        (async () => {
          try {
            const signupResponse = await signupUser({
              email: credentials.email,
              password: credentials.password,
              fullName: credentials.fullName,
            });
            setLogin(true);
            navigate(PATHS.HOME, { replace: true });
            setCredentials({
              email: null,
              password: null,
              fullName: null,
              confirmPassword: null,
            });
          } catch (e) {
            if (e.response.status === 422) {
              toast.warning(ERROR.ACCOUNT_EXIST, {
                autoClose: 1200,
              });
              setCredentials({
                email: null,
                password: null,
                fullName: null,
                confirmPassword: null,
              });
            } else {
              toast.warning(ERROR.UNEXPECTED_ERROR, {
                autoClose: 1200,
              });
              setCredentials({
                email: null,
                password: null,
                fullName: null,
                confirmPassword: null,
              });
            }
          }
        })();
      }
    } else {
      toast.warning(ERROR.REQUIRED_FILEDS, {
        autoClose: 1200,
      });
    }
  };

  return (
    <div className="flex-H-center-H">
      <form className="auth-form" onSubmit={singupHandler}>
        <h2 className="text-align-center">Login</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </div>
        <div>
          <label>full Name</label>
          <input
            type="text"
            onChange={(e) =>
              setCredentials({ ...credentials, fullName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <div>
          <label>confirm password</label>
          <input
            type="password"
            onChange={(e) =>
              setCredentials({
                ...credentials,
                confirmPassword: e.target.value,
              })
            }
          />
        </div>
        <button className="btn primary-icon-btn" id="cta">
          sign up
        </button>
        <small>
          Have an account <strong>Login</strong>
        </small>
      </form>
    </div>
  );
}

// modified versions

// export function Login() {
//   const navigate = useNavigate();
//   const { setLogin } = useAuthProvider();
//   const location = useLocation();
//   const emailInput = useRef(null);
//   const passwordInput = useRef(null);
//   const { toast } = useNotifyUser();
//   const [validatedCredentials, validteCredentials] = useState({
//     email: false,
//     password: false,
//   });

//   const [testCredentials, setTestCredentials] = useState(null);

//   const submitLoginForm = async (e) => {
//     e.preventDefault();
//     if (emailInput.current.value === "" && passwordInput.current.value !== "")
//       validteCredentials({ email: true, password: false });
//     else if (
//       passwordInput.current.value === "" &&
//       emailInput.current.value !== ""
//     )
//       validteCredentials({ email: false, password: true });
//     else if (
//       passwordInput.current.value === "" &&
//       emailInput.current.value === ""
//     )
//       validteCredentials({ email: true, password: true });
//     else {
//       try {
//         const loginResponse = await loginUser({
//           email: emailInput.current.value,
//           password: passwordInput.current.value,
//         });
//         setLogin(true);
//         navigate(location.state?.from?.pathname ?? "/home", { replace: true });
//       } catch (e) {
//         // validteCredentials({ email: null, password: null });
//         emailInput.current.value = "";
//         passwordInput.current.value = "";
//         setTestCredentials({
//           tesetEmail: "adarshbalika@gmail.com",
//           testPassword: "adarshBalika1234",
//         });
//         if (e.response.status === 401) {
//           toast.error("Invalid email or password. Please try again.");
//         } else if (e.response.status === 404) {
//           toast.error("No user found with this email. Please try again.");
//         } else {
//           console.log(e, "buggggggggggggggggggg");
//           toast.error("Unexpected error. Please try again in some time.");
//         }
//       }
//     }
//   };
//   return (
//     <div className="auth-form">
//       <h1>
//         Spark Wind <GiWindSlap className="hero-icon" />
//       </h1>
//       <form onSubmit={submitLoginForm}>
//         <center>
//           <h2>Login</h2>
//         </center>
//         <div>
//           <label>Email address</label>
//           <input
//             type="email"
//             placeholder="email"
//             ref={emailInput}
//             value={testCredentials && testCredentials.tesetEmail}
//             onChange={() =>
//               validteCredentials((prev) => ({
//                 ...prev,
//                 email: false,
//               }))
//             }
//           />
//           {validatedCredentials.email && (
//             <p className="style-error">Please Provide Email</p>
//           )}
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="********"
//             ref={passwordInput}
//             value={testCredentials && testCredentials.testPassword}
//             onChange={() =>
//               validteCredentials((prev) => ({
//                 ...prev,
//                 password: false,
//               }))
//             }
//           />
//           {validatedCredentials.password && (
//             <p className="style-error">Please Provide password</p>
//           )}
//         </div>
//         <div className="flex-H-space-bw">
//           <div className="flex-H-center-V">
//             <input type="checkbox" className="checkbox" />
//             <p>Remember Me</p>
//           </div>
//           <p>Forgot Your Password</p>
//         </div>
//         <div>
//           <Cta type={"primary-cta"} text={"Login"} />
//         </div>
//         <div
//           onClick={() =>
//             setTestCredentials({
//               tesetEmail: "adarshbalika@gmail.com",
//               testPassword: "adarshBalika1234",
//             })
//           }
//         >
//           <Cta type={"primary-cta"} text={"TestLogin"} />
//         </div>

//         <NavLink to={PATHS.SIGNUP}>
//           <div className="account-info">
//             <p>Create New Acccount</p>
//             <MdOutlineKeyboardArrowRight className="icon" />
//           </div>
//         </NavLink>
//       </form>
//     </div>
//   );
// }

// signup

// export function Signup() {
//   const { toast } = useNotifyUser();
//   const navigate = useNavigate();
//   const { setLogin } = useAuthProvider();
//   const location = useLocation();
//   let intialDetials = {
//     firstName: null,
//     lastName: null,
//     email: null,
//     password: null,
//     confirmPassword: null,
//     displayname: null,
//     termsAndConditions: false,
//   };
//   const [detials, setDetials] = useState(intialDetials);
//   const submitSignupForm = async (e) => {
//     e.preventDefault();
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//       termsAndConditions,
//     } = detials;
//     //   setError(initialErrorState);

//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters long");
//       setDetials((predDetials) => ({
//         ...predDetials,
//         password: "",
//         confirmPassword: "",
//       }));
//     } else if (password.search(/\d/) === -1) {
//       toast.error("Password must contain at least one number");
//       setDetials((predDetials) => ({
//         ...predDetials,
//         password: "",
//         confirmPassword: "",
//       }));
//     } else if (password.search(/[a-z]/) === -1) {
//       toast.error("Password must contain at least one lowercase letter");
//       setDetials((predDetials) => ({
//         ...predDetials,
//         password: "",
//         confirmPassword: "",
//       }));
//     } else if (password.search(/[A-Z]/) === -1) {
//       toast.error("Password must contain at least one Uppercase letter");
//       setDetials((predDetials) => ({
//         ...predDetials,
//         password: "",
//         confirmPassword: "",
//       }));
//     } else if (password !== confirmPassword) {
//       toast.error("Both Passwords Should Match");
//       setDetials((predDetials) => ({
//         ...predDetials,
//         password: "",
//         confirmPassword: "",
//       }));
//     } else if (!termsAndConditions) {
//       toast.warning("Please Select Termas&Conditions");
//     } else {
//       try {
//         const signupResponse = await signupUser({
//           firstName: detials.firstName,
//           lastName: detials.lastName,
//           email: detials.email,
//           password: detials.password,
//           displayname: detials.displayname,
//           userPhoto: "https://picturepan2.github.io/spectre/img/avatar-5.png",
//           portfolioUrl: "give your Portfolio address",
//           bio: "Change your Bio",
//         });
//         toast.success("Account created successfully!");
//         setLogin(true);
//         navigate(location.state?.from?.pathname ?? "/home", { replace: true });
//       } catch (e) {
//         if (e.response.status === 422) {
//           toast.error("Account already exists");
//           setDetials(intialDetials);
//         } else {
//           toast.error("Unexpected error");
//         }
//       }
//     }
//   };

//   const setDetialsHandler = (e) => {
//     if (e.target.name !== "termsAndConditions")
//       setDetials((prevCredentials) => ({
//         ...prevCredentials,
//         [e.target.name]: e.target.value,
//       }));
//     else
//       setDetials((prevCredentials) => ({
//         ...prevCredentials,
//         [e.target.name]: e.target.checked,
//       }));
//   };

//   return (
//     <div className="auth-form">
//       <h1>
//         Spark Wind <GiWindSlap className="hero-icon" />
//       </h1>
//       <form onSubmit={submitSignupForm}>
//         <center>
//           <h2>Signup</h2>
//         </center>
//         <div>
//           <label>First Name</label>
//           <input
//             type="text"
//             placeholder="name"
//             name="firstName"
//             onChange={setDetialsHandler}
//           />
//         </div>
//         <div>
//           <label>Last Name</label>
//           <input
//             type="text"
//             placeholder="name"
//             name="lastName"
//             onChange={setDetialsHandler}
//           />
//         </div>
//         <div>
//           <label>User Name</label>
//           <input
//             type="text"
//             placeholder="username"
//             name="displayName"
//             onChange={setDetialsHandler}
//           />
//         </div>
//         <div>
//           <label>Email address</label>
//           <input
//             type="email"
//             placeholder="email"
//             name="email"
//             onChange={setDetialsHandler}
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="********"
//             name="password"
//             onChange={setDetialsHandler}
//           />
//         </div>
//         <div>
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             placeholder="********"
//             name="confirmPassword"
//             onChange={setDetialsHandler}
//           />
//         </div>

//         <div className="flex-H-center-V">
//           <input
//             type="checkbox"
//             className="checkbox"
//             name="termsAndConditions"
//             onChange={setDetialsHandler}
//           />
//           <p>I accept all terms and conditions</p>
//         </div>

//         <div>
//           <Cta type={"primary-cta"} text={"Signup"} />
//         </div>
//         <NavLink to={PATHS.LOGIN}>
//           <div className="account-info">
//             <p>Already have an account</p>
//             <MdOutlineKeyboardArrowRight className="icon" />
//           </div>
//         </NavLink>
//       </form>
//     </div>
//   );
// }
export { LoginRoute, SignupRoute };
