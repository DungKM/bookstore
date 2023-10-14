import * as Request from "../utils/httpRequest";

export const postComment = async (post) => {
    try {
      await Request.post(`comment`, post);
    } catch (error) {
      console.log(error);
    }
  };
export const getComments = async (id) => {
    try {
        const res = await Request.get(`list-comment/${id}`);
        return res;
    } catch (error) {
      console.log(error);
    }
  };