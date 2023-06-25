import {Button, Card} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux";
import {addItem, decreaseQuantity, deleteItem} from "../actions/cartAction";
import {CartReducer, Product, ShoppingItem} from "../types/Interfaces";
import {Link} from "react-router-dom";


export function StoreItem(item: Product) {
    const shoppingItems: ShoppingItem[] = useSelector((state: CartReducer) => state.shoppingItems);
    const quantity = shoppingItems.find(element => element.item.id === item.id)?.quantity || 0
    const dispatch = useDispatch()

    function addItemToCard() {
        if (item) {
            dispatch(addItem(item))
        }
    }

    function decreaseProductQuantity() {
        if (item) {
            dispatch(decreaseQuantity(item));
        }
    }

    const handleRemoveItem = () => {
        if (item) {
            dispatch(deleteItem(item));
        }
    };


    return <Card style={{height: "350px"}}>
        <Link to={`/product/${item?.id}`}>
            <Card.Img
                variant="top"
                src={item.image}
                height="200px"
                style={{objectFit: "cover"}}
            />
        </Link>
        <Card.Body className="d-flex flex-column">
            <Card.Title
                className="d-flex justify-content-space-between align-items-baseline">
                <span className="fs-5 fst-normal">{item.title}</span>
            </Card.Title>
            <div className='mt-auto'>
                {quantity === 0 ?
                    <Button variant="outline-primary" size="sm" onClick={addItemToCard} id='add_item'>Add item</Button>
                    :
                    (<div className="d-flex align-item-center justify-content-center"
                          style={{gap: ".5rem"}}>
                            <Button variant="outline-secondary" size="sm" onClick={decreaseProductQuantity}>-</Button>
                            <div>
                                <span className="fs-3">{quantity} </span> in cart
                            </div>
                            <Button variant="outline-success" size="sm" onClick={addItemToCard}>+</Button>
                            <Button variant="outline-danger" size="sm" onClick={handleRemoveItem}> &times; </Button>
                        </div>

                    )
                }

            </div>
        </Card.Body>
    </Card>
}