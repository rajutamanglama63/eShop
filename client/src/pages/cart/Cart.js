import {Link, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Box from '../../components/calculationBox/Box'
import Item from '../../components/cartitem/Item'
import { addToCart, removeFromCart } from '../../redux/actions/cartAction'
import './cart.css'

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);

    if(!auth._id) {
        alert("Please login first.")
        return <Redirect to='/login' />
    }


    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
    }

    const getCartCount = () => {
        return cart.reduce((qty, cartItem) => Number(cartItem.qty) + qty, 0);
    }

    const getCartSubTotal = () => {
        return cart
          .reduce((price, cartItem) => price + cartItem.price * cartItem.qty, 0)
          .toFixed(2);
      };

    const removeHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    return (
        <div>
            <div className="cart">
                <div className="cart_detail">
                    <div className="cart_item_list">

                        {cart.length === 0 ? (
                            <>
                                Your cart is empty.<Link to='/'>Go Back.</Link>
                            </>
                        ): cart.map((cartItem) => (
                            <Item key={cartItem._id} cartItem={cartItem} qtyChangeHandler={qtyChangeHandler} removeHandler={removeHandler} />
                        ))}
                    </div>
                    <div className="box">
                        <Box getCartCount={getCartCount} getCartSubTotal={getCartSubTotal} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
