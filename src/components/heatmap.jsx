import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import ReactApexChart from "react-apexcharts";
import { ViewAgenda } from '@mui/icons-material';

const Heatmap = () => {
    const [category, setCategory] = useState([]);
    const [dataw1, setDataw1] = useState([]);
    const [dataw2, setDataw2] = useState([]);
    const [dataw4, setDataw3] = useState([]);
    const [dataw3, setDataw4] = useState([]);


    useEffect(() => {
        const name=[];
        const amountw1=[];
        const amountw2=[];
        const amountw3=[];
        const amountw4=[];

        const urlw1="http://localhost/deshboard-sidebar-main/src/api/heatmapw1.php";
        const urlw2="http://localhost/deshboard-sidebar-main/src/api/heatmapw2.php";
        const urlw3="http://localhost/deshboard-sidebar-main/src/api/heatmapw3.php";
        const urlw4="http://localhost/deshboard-sidebar-main/src/api/heatmapw4.php";
        let fData=new FormData();
        fData.append('userID', localStorage.getItem("userID"));
        axios.post(urlw1, fData).then(response =>{
            response.data.map(item=>{
                amountw1.push(parseInt(item.amount));
            })
            while(amountw1.length<7){
                amountw1.push(0);
            }
            setDataw1(amountw1);

        })
        axios.post(urlw2, fData).then(response =>{
            response.data.map(item=>{
                amountw2.push(parseInt(item.amount));
            })
            while(amountw2.length<7){
                amountw2.push(0);
            }
            setDataw2(amountw2);

        })
        axios.post(urlw3, fData).then(response =>{
            response.data.map(item=>{
                amountw3.push(parseInt(item.amount));
            })
            while(amountw3.length<7){
                amountw3.push(0);
            }
            setDataw3(amountw4);

        })
        axios.post(urlw4, fData).then(response =>{
            response.data.map(item=>{
                amountw4.push(parseInt(item.amount));
            })
            while(amountw4.length<7){
                amountw4.push(0);
            }
            setDataw4(amountw3);

        })
    },[])
    console.log("lungime", dataw2.length)
    return(
        <div className='graph'>
        <Chart 
        type="heatmap"
        height= {350}
        
        series= {[
            {
            name: '4th Week',
            data: dataw4
          },
          {
            name: '3rd Week',
            data: dataw3
          },
          {
            name: '2nd Week',
            data: dataw2
          },
            {
            name: '1st Week',
            data: dataw1
          },
        ]}

        responsive= {[{
            breakpoint: '480',
            options: {
                 chart: {
                width: '200'
              },
            },
        }]}

        options={{
            stroke: {
                width: 3
              },
            plotOptions: {
                heatmap: {
                    useFillColorAsStroke: false,
                    colorScale: {
                        ranges: [{
                            from: 0,
                            to: 0,
                            color: '#DBD4D4',
                            name:'0'
                          }
                        ]
                      }
                }
            },
            chart: {
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            chart: {
                foreColor: '#fff',
              },
            labels:['1','2','3','4','5','6','7'],
            legend: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
              onDatasetHover: {
                highlightDataSeries: false,
            },
            dataLabels: {
                enabled: true,
                style:{
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: ['#000', '#000']
                }
              },
              colors: ['#FF4560', '#00E396','#FEB019','#775DD0'],
              title: {
                text: 'Amount spent every day for 4 weeks'
              },
        }}
        ></Chart></div>
    )
}

export default Heatmap;

