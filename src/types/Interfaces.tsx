export interface ShoppingItem {
    item: Product,
    quantity: number

}

export interface Product {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    rating: Rating

}

export interface Rating {
    count: number,
    rate: number
}

export interface CartReducer {
    items: Product [],
    shoppingItems: ShoppingItem[],
    showCart: boolean,
    product: Product,
    total: number
}

