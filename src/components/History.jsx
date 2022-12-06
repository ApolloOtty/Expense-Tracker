import React from 'react';
import Sidebar from './Sidebar2';
import { useRef, useState, useContext, useEffect} from 'react';
import axios from '../api/axios.js';
import './history.css';
import { CSVLink, CSVDownload } from "react-csv";
import {BiDownload} from "react-icons/bi";

const History = () => {

    const[val, setVal]=useState([]);


    useEffect(function(){
        const url="http://localhost/deshboard-sidebar-main/src/api/getTransactions.php";
          let fData=new FormData();
          fData.append('userID', localStorage.getItem("userID"));
          axios.post(url, fData)
          .then(response => setVal(response.data))
    },[] 
    )
    
    const checkColor = (description) => {
        switch (description) {
          case "expense":
            return "red";
          case "income":
            return "green";
          default:
        }};

        const checkType = (description) => {
            switch (description) {
              case "expense":
                return 1;
              case "income":
                return 0;
              default:
            }};

            const headers = [
              {label:"Date", key:"date"},
              {label:"Category", key:"categoryName"},
              {label:"Type", key:"type"},
              {label:"Amount", key:"amount"}
            ];

            const csvReport = {
              filename:"Transactions.csv",
              headers: headers,
              data:val
            } 

    return (
        <>
          <button className='downloadcsv'><CSVLink style={{color: 'black'}} {...csvReport} ><BiDownload size={35}/></CSVLink></button>
            <table className='scrollable'>
                {val.map((cat) => (
              <tr>
                <td  className='firsttd'><p className='date'>{cat.date}</p>{cat.categoryName}</td>
                <td className='secondtd' style={{ color: `${checkColor(cat.type)}` }}> {checkType(cat.type) ? '-' : '+'} {cat.amount} lei</td>
              </tr>
              ))}
            </table>  
        </>
    );
};

export default History;