import axios from "axios";

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

export { createNote, getNotes, editNote };
