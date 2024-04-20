import {Button, Stack} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux";
import {CartReducer, Product} from "../types/Interfaces";
import {addItem, decreaseQuantity, deleteItem} from "../actions/cartAction";
import {Link} from "react-router-dom";


interface CartItemProps {
    id: number;
    quantity: number;
}

export function CartItem({id, quantity}: CartItemProps) {
    const items: Product[] = useSelector((state: CartReducer) => state.items);
    const item: Product | undefined = items.find((elem) => elem.id === id) ;
    const dispatch = useDispatch();

    const handleRemoveItem = () => {
        if (item) {
            dispatch(deleteItem(item));
        }
    };


    function addItemToCard() {
        dispatch(addItem(item))
    }

    function decreaseProductQuantity() {
        dispatch(decreaseQuantity(item));
    }
    if(!item){
        return <div>Error</div>
    }
    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <Link to={`/product/${item?.id}`}>
                <img src={item.image}
                     style={{width: '125px', height: '75px', objectFit: 'cover'}}
                     alt={item.title}
                />
            </Link>

            <div className="me-auto">
                <div>
                    <div className="font-monospace fs-6">{item?.title}</div>
                    {' '}
                    {quantity > 1 && (
                        <span className="text-muted" style={{fontSize: '.65rem'}}> x{quantity}       </span>
                    )}
                </div>
                <div className="text-muted" style={{fontSize: '.75rem'}}>
                    {item?.price}
                </div>
            </div>
            <div>{item?.price && quantity}</div>
            <Button id='decreaseBTN' variant="outline-secondary" size="sm" onClick={decreaseProductQuantity}>-</Button>
            <Button id='increaseBTN' variant="outline-success" size="sm" onClick={addItemToCard}>+</Button>
            <Button id='deleteBTN' variant="outline-danger" size="sm" onClick={handleRemoveItem}>
                &times;
            </Button>
        </Stack>

    );
}