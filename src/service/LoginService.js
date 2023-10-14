import * as Request from "../utils/httpRequest";

export const postLogin = async (post) => {
  try {
    const res = await Request.post(`login`, post);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const LoginGoogle = async (post) => {
  try {
    const res = await Request.get(`auth/google/redirect`, post);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const postRegister = async (post) => {
  return await Request.post(`register`, post);
};
