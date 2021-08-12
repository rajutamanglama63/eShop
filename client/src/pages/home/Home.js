import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Card from '../../components/card/Card'
import { getProducts } from '../../redux/actions/productsAction'
import './home.css'

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    return (
        <div>
            <div className="products">
                <div className="grid_container">
                    {products.map((product) => (
                        <Card key={product._id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
