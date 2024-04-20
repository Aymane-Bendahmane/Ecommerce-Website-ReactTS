import {
    ADD_ITEM,
    DECREASE_ITEM_QUANTITY,
    DELETE_ITEM,
    LOAD_ITEMS,
    SET_PRODUCT,
    SHOW_CART
} from "../actionTypes/actionTypes";
import {Product} from "../types/Interfaces";

export const loadItems = (items: Response) => {
    return {
        type: LOAD_ITEMS,
        payload: {
            items: items,
        },
    };
};


export const showCart = (display: boolean) => {
    return {
        type: SHOW_CART,
        payload: {
            showCart: display,
        },
    };
};


export const addItem = (item?: Product) => {
    return {
        type: ADD_ITEM,
        payload: {
            shoppingItem: item,
        },
    };
};
export const decreaseQuantity = (item?: Product) => {
    return {
        type: DECREASE_ITEM_QUANTITY,
        payload: {
            shoppingItem: item,
        },
    };
};
export const deleteItem = (item: Product) => {
    return {
        type: DELETE_ITEM,
        payload: {
            shoppingItem: item,
        },
    };
};

export const setProduct = (item: Product) => {
    return {
        type: SET_PRODUCT,
        payload: {
            product: item,
        },
    };
};