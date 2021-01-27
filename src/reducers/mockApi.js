import { RECEIVE_API } from "../action";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, { type, data }) => {
  switch (type) {
    case RECEIVE_API:
      return data;
    default:
      return state;
  }
};
