import {Card, Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {getProduct} from "../utilities/ApiUtilities.tsx";
import {useDispatch, useSelector} from "react-redux";
import {CartReducer, Product} from "../types/Interfaces.tsx";
import {setProduct} from "../actions/cartAction.tsx";
import {useQuery} from "@tanstack/react-query";

import {Spinner} from "../components/Spinner";

export function ProductDetail() {
    const {productId} = useParams();
    const dispatch = useDispatch();
    const product: Product = useSelector((state: CartReducer) => state.product);

    const productDetail = useQuery({
        queryKey: ['product'],
        queryFn: () =>
            getProduct(productId)
                .then((item) => dispatch(setProduct(item)))

    })

    if (productDetail?.isFetching) {
        return (<Spinner message='Products are loading'/>)
    }

    if (productDetail.isError)
        return <div>Error fetching data</div>

    return (
        <div>
            <Row>
                <Col md={6}>
                    <Card style={{width: '100%'}}>
                        <Card.Img variant="top" src={product.image} height="500px"/>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card style={{width: '100%', height: "500px"}}>
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>Price: {product.price}</Card.Text>
                            <Card.Text>
                                Rating: {product?.rating?.rate} ({product?.rating?.count} reviews)
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>

    );
}

