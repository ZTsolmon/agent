import axios from "axios";
import { GET_AGENTS, GET_SEARCH } from "./types";
// Update Profile
export const getAgents = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("/agents");
    dispatch({ type: GET_AGENTS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
  }
};

export const search = (form) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(form);

  try {
    const res = await axios.post("/search", body, config);
    dispatch({ type: GET_SEARCH, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
  }
};

export const uploadQR = (form) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  formData.append("file", form);

  try {
    const res = await axios.post("/qr", formData, config);
    dispatch({ type: GET_SEARCH, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
  }
};
