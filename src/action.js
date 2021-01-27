export const REQUEST_API = "REQUEST_API";
export const RECEIVE_API = "RECEIVE_API";

export const requestApi = () => ({ type: REQUEST_API });
export const receiveApi = (data) => ({ type: RECEIVE_API, data });
