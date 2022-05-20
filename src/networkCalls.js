import axios from "axios";
import Cookies from "js-cookie";

export const getJwtToken = () => {
  return Cookies.get("jwt_token");
};

const createNote = async (payload) => {
  try {
    const response = await axios.post("/api/notes", payload, {
      headers: {
        authorization: getJwtToken(),
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};

const getNotes = async () => {
  try {
    const response = await axios.get("/api/notes", {
      headers: {
        authorization: getJwtToken(),
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};

const editNote = async (id, payload) => {
  try {
    const response = axios.post(`/api/notes/${id}`, payload, {
      headers: {
        authorization: getJwtToken(),
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);
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
