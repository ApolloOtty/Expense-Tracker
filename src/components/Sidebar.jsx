import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import {BiCategory, BiDialpadAlt, BiMoney} from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import logo from './bingus.png'

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<BiDialpadAlt/>
        },
        {
            path:"/about",
            name:"Categories",
            icon:<BiCategory/>
        },
        {
            path:"/analytics",
            name:"Transactions",
            icon:<BiMoney/>
        }, 
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "0px"}} className="sidebar">
               <div className="top_section">
               <img src={logo} style={{display: isOpen ? "block" : "none"}}/>
               <br></br>
               <br></br>
               <br></br>
                   <div style={{marginLeft: isOpen ? "50px" : "12px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               <br></br>
               <br></br>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                        <br></br>
                           <div className="icon">{item.icon}</div>
                           <br></br>
                           <br></br>
                           <br></br>
                           <br></br>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;