import * as Request from "../utils/httpRequest";

export const postCart = async (post) => {
  try {
    await Request.post(`addtocart`, post);
  } catch (error) {
    console.log(error);
  }
};
export const postOrder = async (post) => {
  try {
    await Request.post(`createorder`, post);
  } catch (error) {
    console.log(error);
  }
};
export const destroyCart = async (id) => {
  try {
    return await Request.destroy(`delete-cart/${id}`);
  } catch (error) {
    console.log(error);
  }
};
export const destroyAllCart = async (id) => {
  try {
    return await Request.destroy(`delete-all-cart/${id}`);
  } catch (error) {
    console.log(error);
  }
};
export const detailCartUser = async (id) => {
  try {
    const res = await Request.get(`cart-client/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updateQuantityCart = async (post, id) => {
  try {
    const res = await Request.updateForm(`update-cart/${id}`, post);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (id) => {
  try {
    const res = await Request.get(`list-order/${id}`);
   return res;
  } catch (error) {
      console.log(error);
  }
};