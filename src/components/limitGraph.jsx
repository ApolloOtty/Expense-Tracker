import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import "../components/linechart.css";
import { dark } from '@mui/material/styles/createPalette';

function Line  () {
    const [month, setMonth] = useState([]);
    const [balance, setBalance] = useState([]);
    const [limit, setLimit] = useState([]);



    useEffect(() => {
        const month=[];
        const balance=[];
        const limit=[]

        const url="http://localhost/deshboard-sidebar-main/src/api/getBalance.php";
        let fData=new FormData();
        fData.append('userID', localStorage.getItem("userID"));
        axios.post(url, fData).then(response =>{
            response.data.map(item=>{
                console.log("item", item);
                month.push(item.month);
                balance.push(parseInt(item.balance));
                limit.push(parseInt(item.spendingLimit));
            })
            
            
            //if(amount.length===0){
           // amount.push(0)
           // name.push("No categories added yet")
           // }
            setBalance(balance);
            setMonth(month);

            setLimit(limit);
            const lastElementBalance = balance.slice(-1)[0];
            const lastElementLimit = limit.slice(-1)[0];
            localStorage.setItem("lastElementBalance", lastElementBalance)
            localStorage.setItem("lastElementLimit", lastElementLimit)
            
        })
    },[])
    console.log("Balance",balance);
    console.log("Month",month);
    console.log("Limit",limit);
    return(
        <React.Fragment>
        <div className='container-fluid mt-3 mb-3'>      
        <Chart 
        type="line"
        width={1200}
        height={500}
        series={[
            {
            name: 'Amount spent',
            type: 'column',
            data: balance
            },
           {
            name: 'Spending limit',
            type: 'line',
            data: limit
          },
        ]}

        options={{ 
          tooltip: {
            theme: 'dark',
            style: {
              background: '#fff',
              fontSize: '20px',
              foreColor: '#fff',
            },
          },
            legend: {
                fontSize: "20px",
              },
            chart: {
              height: 350,
              type: 'line',
            foreColor: '#fff',
            
            },
            stroke: {
              width: [0, 4]
            },
            title: {
              text: '',
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [1],
              style:{
                fontSize: '25px',
                }
            },
            labels: month,
            xaxis: {
              type: 'month',
              labels: {
                style: {
                    fontSize: '21px'
                }
           },
            },
            
            yaxis: [{
              labels: {
                style: {
                    fontSize: '21px'
                }
           },
              title: {
                text: 'Amount spent',
                style:{
                    fontSize: '14px',
                    }
              },
            
            }, {
              labels: {
                style: {
                    fontSize: '21px'
                }
           },
              opposite: true,
              seriesName:'Amount spent',
              //max: Math.max(...balance),
              title: {
                text: 'Spending limit'
              }
            }]
          }}
        /></div>
        </React.Fragment>
    )
}

export default Line;

