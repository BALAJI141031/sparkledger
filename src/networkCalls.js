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
  } catch (e) {
    console.log(e);
  }
};

export { createNote, getNotes };
