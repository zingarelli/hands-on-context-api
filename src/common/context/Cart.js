import { createContext, useContext, useEffect, useState } from "react";
import { PaymentContext, usePaymentContext } from "./Payment";
import { UserContext } from "./User";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // cart will have a list of Products
    const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);
    const [totalPriceInCart, setTotalPriceInCart] = useState(0);

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                numberOfItemsInCart,
                setNumberOfItemsInCart,
                totalPriceInCart,
                setTotalPriceInCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

// custom hook that will be responsible to manipulate cart state
export const useCartContext = () => {
    const {
        cart,
        setCart,
        numberOfItemsInCart,
        setNumberOfItemsInCart,
        totalPriceInCart,
        setTotalPriceInCart
    } = useContext(CartContext);

    const { selectedPayment } = usePaymentContext(PaymentContext);

    const { setSaldo } = useContext(UserContext);

    function updateQuantity(id, value) {
        return cart.map(item => {
            if (item.id === id) item.qty += value;
            return item;
        })
    }

    function addToCart(product) {
        const isAlreadyInTheCart = cart.some(item => item.id === product.id);

        if (!isAlreadyInTheCart) {
            product.qty = 1;
            return setCart(oldCart => [...oldCart, product])
        }

        setCart(updateQuantity(product.id, 1));
    }

    function removeFromCart(id) {
        const productInCart = cart.find(item => item.id === id);
        const singleQuantity = productInCart?.qty === 1 || false;

        if (singleQuantity) {
            return setCart(oldCart => oldCart.filter(item => item.id !== id));
        }

        setCart(updateQuantity(id, -1))
    }

    function checkout() {
        setCart([]);
        setSaldo(oldValue => oldValue - totalPriceInCart);
    }

    // update the number of items in cart and total price whenever the cart changes
    // every quantity of the same product count as a single item
    useEffect(() => {
        const { numberOfItems, totalPrice } = cart.reduce((count, product) => (
            {
                numberOfItems: count.numberOfItems + product.qty,
                totalPrice: count.totalPrice + (product.qty * product.valor)
            }
        ), { numberOfItems: 0, totalPrice: 0 });

        setNumberOfItemsInCart(numberOfItems);

        // interest is included for some payment methods
        setTotalPriceInCart(totalPrice * selectedPayment.interest);
    }, [cart, setNumberOfItemsInCart, setTotalPriceInCart, selectedPayment])

    return {
        cart,
        addToCart,
        removeFromCart,
        numberOfItemsInCart,
        totalPriceInCart,
        checkout
    };
}