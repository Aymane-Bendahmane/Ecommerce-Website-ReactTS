import {Col, Row} from "react-bootstrap"
import {StoreItem} from "../components/StoreItem"
import {useDispatch, useSelector} from "react-redux"
import {loadItems} from "../actions/cartAction"
import {CartReducer, Product} from "../types/Interfaces";
import {getProductsList} from "../utilities/ApiUtilities.tsx";
import {useQuery} from "@tanstack/react-query";
import {Spinner} from "../components/Spinner";

export function Store() {


    const dispatch = useDispatch();
    const storeItems: Product [] = useSelector((state: CartReducer) => state.items)

    const productList = useQuery({
        queryKey: ['products'],
        queryFn: () => getProductsList().then(r => dispatch(loadItems(r))),
        staleTime: 5000,
    })

    if (productList?.isFetching) {
        return (<Spinner message='Products are loading'/>)
    }

    if (productList.isError)
        return <div>Error fetching data</div>

    return (
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {
                    storeItems?.map((item: Product) => (
                        <Col key={item.id}>
                            <StoreItem {...item} />
                        </Col>
                    ))
                }
            </Row>

        </>
    )
}