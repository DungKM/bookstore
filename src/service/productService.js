import * as Request from "../utils/httpRequest";

export const getProducts = async () => {
    try {
      const res = await Request.get("products-client");
     return res.data;
    } catch (error) {
        console.log(error);
    }
  };


export const detailProduct = async (id) => {
    try {
     const res =  await Request.get(`product-client/${id}`);
     return res;
    } catch (error) {
        console.log(error);
    }
  };
