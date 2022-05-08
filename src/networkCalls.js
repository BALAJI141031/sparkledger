import axios from "axios";
import Cookies from "js-cookie";

const createNote = async (payload) => {
  try {
    const response = await axios.post("/api/notes", payload, {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZGM3NGRhMC03NDA1LTQ4ZjMtOWEwYy1lY2Q4ZjgzOTlhYzQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.O5xhr4upZ9a9JuH_DZ9Xp3rCx6lypVssXTeSCRVQoog",
      },
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

const getNotes = async () => {
  try {
    const response = await axios.get("/api/notes", {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZGM3NGRhMC03NDA1LTQ4ZjMtOWEwYy1lY2Q4ZjgzOTlhYzQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.O5xhr4upZ9a9JuH_DZ9Xp3rCx6lypVssXTeSCRVQoog",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const editNote = async (id, payload) => {
  try {
    console.log(id, "idddddddddddddddd", payload);
    const response = axios.post(`/api/notes/${id}`, payload, {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZGM3NGRhMC03NDA1LTQ4ZjMtOWEwYy1lY2Q4ZjgzOTlhYzQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.O5xhr4upZ9a9JuH_DZ9Xp3rCx6lypVssXTeSCRVQoog",
      },
    });
    console.log(response, "is true or false");
    return response;
  } catch (e) {
    throw e;
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);
    console.log(response);

    if (response.status === 200) {
      Cookies.set("jwt_token", response.data.encodedToken, {
        expires: 1,
      });
      return response.status;
    }
  } catch (e) {
    throw e;
  }
};

const signupUser = async (userData) => {
  try {
    const response = await axios.post("/api/auth/signup", userData);
    console.log(response);
    if (response.status === 201) {
      Cookies.set("jwt_token", response.data.encodedToken, {
        expires: 1,
      });
      return response.status;
    }
  } catch (e) {
    throw e;
  }
};
export { createNote, getNotes, editNote, loginUser, signupUser };
