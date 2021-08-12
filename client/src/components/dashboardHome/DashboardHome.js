import { useEffect, useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import { getProduct } from "../../redux/actions/productsAction";
import { allUsers } from "../../redux/actions/userAction";
import "./dashboardHome.css"

const DashboardHome = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const products = useSelector(state => state.products)
    // const [usersLength, setUserLength] = useState(0);
    // const [productsLength, setProductsLength] = useState(0);

    useEffect(() => {
        dispatch(allUsers());
        dispatch(getProduct());
        // setUserLength(users.length);
        // setProductsLength(products.length);
    }, [dispatch]);
    return (
        <div>
            <div className="card_division">
                <div className="dashboard_card">
                    <h3 style={{color : "navy"}}>Users</h3>
                    <p>{users.length}</p>
                </div>
                <div className="dashboard_card">
                    <h3 style={{color : "navy"}}>Products</h3>
                        <p>{products.length}</p>
                </div>
            </div>
            <div className="catagory_division">
                <h3 style={{color : "navy", margin : "10px 0"}}>Catagories</h3>
                <ul className="catagory_list">
                    <li className="catagory_item">Men</li>
                    <li className="catagory_item">Female</li>
                    <li className="catagory_item">Laptop</li>
                    <li className="catagory_item">etc...</li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardHome
