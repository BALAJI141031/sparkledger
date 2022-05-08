import { BiShow } from "../../icons";
import "./index.css";
import { useState } from "react";
import { CREDENTIALS, ERROR, PATHS } from "../../config/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../../networkCalls";
import { useAuthProvider } from "../../Contexts";
import { useNotifyUser } from "../../Contexts";
import Cookies from "js-cookie";
function LoginRoute() {
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
    emailError: null,
    passwordError: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { setLogin } = useAuthProvider();
  const [passwordType, setPasswordType] = useState(true);
  // handle login
  const handleAuth = () => {
    if (
      ((credentials.email === "" || credentials.email === null) &&
        credentials.password === "") ||
      credentials.password === null
    ) {
      if (credentials.email === "" || credentials.email === null)
        setCredentials({
          email: null,
          password: null,
          emailError: ERROR.EMPTY_EMAIL,
          passwordError: null,
        });

      if (credentials.password === "" || credentials.password === null)
        setCredentials((prevState) => ({
          ...prevState,
          passwordError: ERROR.EMPTY_PASSWORD,
        }));
    } else {
      (async () => {
        try {
          const loginResponse = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });
          setLogin(true);
          navigate(location.state?.from?.pathname ?? "/", { replace: true });
          setCredentials({ email: null, password: null });
        } catch (e) {
          if (e.response.status === 401) {
            setCredentials((prevState) => ({
              ...prevState,
              passwordError: ERROR.PASSWORD_ERROR,
            }));
          }
          if (e.response.status === 404) {
            setCredentials((prevState) => ({
              ...prevState,
              emailError: ERROR.EMAIL_ERROR,
            }));
          } else {
          }
        }
      })();
    }
  };

  return (
    <div className="flex-H-center-H">
      {/* <img src="../../assets/hero.png" /> */}
      <div className="auth-form">
        <h2 className="text-align-center">Login</h2>
        <div className="email-div">
          <label>Email</label>
          <input
            value={credentials.email}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                email: e.target.value,
                emailError: null,
              }))
            }
          />
          {credentials.emailError && <p>{credentials.emailError}</p>}
        </div>
        <div className="password-div">
          <label>Password</label>
          <div className="rel-pos">
            <input
              type={passwordType && "password"}
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                  passwordError: null,
                }))
              }
            />
            <BiShow
              className="input-icon"
              onClick={() => setPasswordType((type) => !type)}
            />
          </div>
          {credentials.passwordError && <p>{credentials.passwordError}</p>}
        </div>
        <button className="btn primary-icon-btn" id="cta" onClick={handleAuth}>
          Login
        </button>
        <button
          className="btn primary-icon-btn"
          id="cta"
          onClick={() => {
            setCredentials({
              email: CREDENTIALS.USER_NAME,
              password: CREDENTIALS.PASSWORD,
            });
          }}
        >
          Bot
        </button>
      </div>
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

export { LoginRoute, SignupRoute };
