import {
    ADD_ITEM,
    DECREASE_ITEM_QUANTITY,
    DELETE_ITEM,
    LOAD_ITEMS,
    SET_PRODUCT,
    SHOW_CART
} from "../actionTypes/actionTypes";
import {Product, ShoppingItem} from "../types/Interfaces";

const getInitialShoppingItems = () => {
    const storedItems = localStorage.getItem("shoppingItems");
    return storedItems ? JSON.parse(storedItems) : [];
};
const getInitialTotal = () => {
    const total = localStorage.getItem("total");
    return total ? JSON.parse(total) : 0;
};
const updateLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}
const initialState = {
    items: [],
    product: {},
    shoppingItems: getInitialShoppingItems(),
    showCart: false,
    total: getInitialTotal()
};

const cartReducer = (state = initialState, action: {
    payload: any; type: any;
}) => {

    switch (action.type) {

        case DELETE_ITEM:
            // eslint-disable-next-line no-case-declarations
            const deleteResult = deleteShoppingItem(action.payload.shoppingItem.id, state.shoppingItems)
            return {
                ...state,
                shoppingItems: deleteResult.updatedItems,
                total: deleteResult.total
            };

        case DECREASE_ITEM_QUANTITY:
            // eslint-disable-next-line no-case-declarations
            const decreaseResult = updateShoppingItems(state.shoppingItems, action.payload.shoppingItem, false)
            return {
                ...state,
                shoppingItems: decreaseResult.updatedItems,
                total: decreaseResult.total
            };
        case ADD_ITEM:

            // eslint-disable-next-line no-case-declarations
            const updatedItems = updateShoppingItems(state.shoppingItems, action.payload.shoppingItem, true);
            return {
                ...state,
                shoppingItems: updatedItems.updatedItems,
                total: updatedItems.total
            };

        case LOAD_ITEMS:
            return {
                ...state,
                items: action.payload.items,
            };
        case SHOW_CART:
            return {
                ...state,
                showCart: action.payload.showCart,
            };
        case SET_PRODUCT:
            return {
                ...state,
                product: action.payload.product,
            };

        default:
            return state;
    }
};
/**
 * Updates the shoppingItems array based on the provided product and quantity.
 * If the product already exists in the array, its quantity is updated.
 * If the quantity becomes zero and `increaseQuantity` is false, the product is removed from the array.
 * If the product doesn't exist in the array, it is added with the provided quantity.
 *
 * @param shoppingItems - The current array of shopping items.
 * @param product - The product to update or add.
 * @param increaseQuantity - A boolean flag indicating whether to increase the quantity (true) or decrease it (false).
 * @returns An object containing the updated shoppingItems array and the total value.
 */
const updateShoppingItems = (
    shoppingItems: ShoppingItem[],
    product: Product,
    increaseQuantity: boolean
): { updatedItems: ShoppingItem[]; total: number } => {


    const existingItemIndex = shoppingItems.findIndex((item) => item.item.id === product.id);
    let updatedItems: ShoppingItem[];

    if (existingItemIndex !== -1) {
        // If the product already exists in the array, update its quantity
        updatedItems = [...shoppingItems];

        if (updatedItems[existingItemIndex].quantity === 1 && !increaseQuantity) {
            // If the quantity becomes zero and increaseQuantity is false, remove the product from the array
            updatedItems = updatedItems.filter((item) => item.item.id !== product.id);
        } else {
            // Increase or decrease the quantity based on the flag
            updatedItems[existingItemIndex].quantity += increaseQuantity ? 1 : -1;
        }
    } else {
        // If the product doesn't exist in the array, add it with the provided quantity
        const newElement: ShoppingItem = {
            item: product,
            quantity: increaseQuantity ? 1 : 0,
        };
        updatedItems = [...shoppingItems, newElement];
    }

    // Calculate the total value
    const total = calculateTotal(updatedItems);
    // Update localStorage with the new values
    updateLocalStorageShoppingItemAndTotal(total, updatedItems)

    return {updatedItems, total};
};
/**
 * Deletes a shopping item with the provided id from the shoppingItems array.
 *
 * @param id - The id of the shopping item to delete.
 * @param shoppingItems - The current array of shopping items.
 * @returns An object containing the updated shoppingItems array and the total value.
 */
const deleteShoppingItem = (id: number, shoppingItems: ShoppingItem[]) => {
    const updatedItems = shoppingItems.filter((elem) => elem.item.id !== id);
    const total = calculateTotal(updatedItems);
    updateLocalStorageShoppingItemAndTotal(total, updatedItems)
    return {updatedItems, total};
};

/**
 * Calculates the total price of the shopping items.
 *
 * @param shoppingItems - The array of shopping items.
 * @returns The total price of the shopping items.
 */
const calculateTotal = (shoppingItems: ShoppingItem[]): number => {
    return shoppingItems.reduce((total, item) => total + item.item.price * item.quantity, 0);
};

/**
 * Updates the localStorage with the provided total and shoppingItems values.
 *
 * @param total - The total value to be stored.
 * @param shoppingItems - The shoppingItems array to be stored.
 */
const updateLocalStorageShoppingItemAndTotal = (total: number, shoppingItems: ShoppingItem[]) => {
    updateLocalStorage('total', total);
    updateLocalStorage('shoppingItems', shoppingItems);
};

export default cartReducer
