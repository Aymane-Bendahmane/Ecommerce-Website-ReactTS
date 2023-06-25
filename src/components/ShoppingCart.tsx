import {Offcanvas, Stack} from "react-bootstrap"
import {useDispatch, useSelector} from 'react-redux';
import {showCart as show} from '../actions/cartAction';
import {CartItem} from "./CartItem";
import {CartReducer, ShoppingItem} from "../types/Interfaces";
import {formatCurrency} from "../utilities/Utilities.tsx";

type ShoppingCartProps = {
    isOpen: boolean
}


export function ShoppingCart({isOpen}: ShoppingCartProps) {
    const dispatch = useDispatch();
    const showCart = useSelector((state: CartReducer) => state.showCart)
    const total = useSelector((state: CartReducer) => state.total)
    const shoppingItems: ShoppingItem[] = useSelector((state: CartReducer) => state.shoppingItems)

    function displayShoppingCart(): void {
        dispatch(show(!showCart));
    }


    return (
        <Offcanvas show={isOpen} onHide={displayShoppingCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {shoppingItems?.map(item => (
                        <CartItem quantity={item.quantity} key={item.item.id} {...item.item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(total, 'USD')}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}