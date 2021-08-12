import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'
import DashboardHome from '../../components/dashboardHome/DashboardHome'
import "./admin.css"

const Admin = () => {
    const auth = useSelector(state => state.auth);

    if(auth.role !== 1) {
        return <Redirect to="/login" />
    };
    
    return (
        <div>
            <div className="admin_navbar">
                <div className="admin_navbar_content">
                    <ul className="nav_list">
                        <li className="nav_item">
                            <Link to="/users" className="nav_link">USER</Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/products" className="nav_link">PR0DUCTS</Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/createproduct" className="nav_link">CREATE PRODUCT</Link>
                        </li>
                        <li className="nav_item">
                            <Link to="#" className="nav_link">ORDERS</Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/catagories" className="nav_link">CATAGORY</Link>
                        </li>
                    </ul>
                    <div className="right">
                        <DashboardHome />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
