import axios from "axios";

export const getProductsList = async (): Promise<any> => {
    return await axios.get('https://fakestoreapi.com/products').then(response => response.data)
};

export const getProduct = async (productId: any) => {
    return await axios.get(`https://fakestoreapi.com/products/${productId}`).then(response => response.data)
};
