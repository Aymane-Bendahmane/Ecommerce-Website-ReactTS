import {Container} from "react-bootstrap"
import {Route, Routes} from 'react-router-dom'
import {Store} from "./pages/Store"
import {NavBar} from "./components/NavBar"
import {ProductDetail} from "./components/ProductDetail";
import {ShoppingCart} from "./components/ShoppingCart.tsx";
import {useSelector} from "react-redux";
import {CartReducer} from "./types/Interfaces.tsx";

function App() {
    const showCart: boolean = useSelector((state: CartReducer) => state.showCart)
    return (
        <>
            <NavBar/>
            <ShoppingCart isOpen={showCart}/>
            <Container className="mb-4">
                <Routes>

                    <Route index element={<Store/>}/>
                    <Route path="/dpl/store" element={<Store/>}/>
                    <Route path="/dpl/" element={<Store/>}/>
                    <Route path="/product/:productId" element={<ProductDetail/>}/>

                </Routes>
            </Container>

        </>
    )
}

export default App
