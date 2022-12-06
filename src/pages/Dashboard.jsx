import React from 'react';
import Graph from './graph.jsx';
import ReactApexChart from "react-apexcharts";
import { useMediaQuery } from 'react-responsive'
import './dashboard.css';
import {
    FaMoneyBillAlt
}from "react-icons/fa";
//import Donut from "./donut.jsx";
import Donut from "../components/donut.jsx";
import Heatmap from "../components/heatmap.jsx";
import Button from '@mui/material/Button';
import ApexChart from "./graph.jsx";
import Sidebar from '../components/Sidebar2';
import './Login';
import { useRef, useState, useContext} from 'react';
import History from "../components/History.jsx";
import { BsFillArrowDownCircleFill,BsFillArrowUpCircleFill } from "react-icons/bs";


const Dashboard = ({balance, expense, income}) => {
    if(!expense)
    expense=0;
    if(!income)
    income=0;
    const[success, setSuccess] = useState(false);
    const verifyLogin = () =>{
        if(localStorage.getItem("userID")===0){
        setSuccess(true);
        }
    }
    localStorage.setItem("balance", (parseInt(balance)+parseInt(income)-parseInt(expense)));
    console.log(localStorage.getItem("balance"))
    console.log(localStorage.getItem("userID"));
    return (
        <>
        { (localStorage.getItem("userID")==='0') ? (
        <section>
            <meta http-equiv="refresh" content="0; url=/" />
        </section>
    ) : (
    <div className='maindashboard'>
        <Sidebar/>
        <div className='grid'>
            <div className='item'>
            <div className='money'><FaMoneyBillAlt className='iconmoney' size={50}/></div>
                <p className='uppertext'>
                    Balance</p><p>{parseInt(balance)+parseInt(income)-parseInt(expense)} lei
                </p>
            </div>
            <div className='item'>
            <div className='money'><BsFillArrowDownCircleFill className='iconspent' size={50}/></div>
                <p>
                <p className='uppertext'>Spent</p>{expense} lei</p>
            </div>
            <div className='item'>
            <div className='money'><BsFillArrowUpCircleFill className='iconincome' size={50}/></div>
                <p>
                <p className='uppertext'>Income</p> {income} lei</p>
            </div>
            <div className='item moveup'>
            <div className='donut'>
             <Donut></Donut>
             </div>
            </div>
            <div className='item3 moveup'>
           <Heatmap></Heatmap>
            </div>
            
            <div className='history'>
            <h1 id='recenttrans'>Recent Transactions</h1>
            <History/>
            </div>
        </div>
    </div>
    )};
        </>
    );
}
export default Dashboard;