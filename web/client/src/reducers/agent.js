import { GET_AGENTS, GET_SEARCH } from "../actions/types";

const initialState = {
  agents: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_AGENTS:
      return {
        ...state,
        agents: payload,
        loading: false,
      };
    case GET_SEARCH:
      return {
        ...state,
        agents: payload,
        loading: false,
      };
    default:
      return state;
  }
}
