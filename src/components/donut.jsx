import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function Donut  () {
    const [category, setCategory] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        const name=[];
        const amount=[];

        const url="http://localhost/deshboard-sidebar-main/src/api/donutchart.php";
        let fData=new FormData();
        fData.append('userID', localStorage.getItem("userID"));
        axios.post(url, fData).then(response =>{
            response.data.map(item=>{
                console.log("item", item);
                name.push(item.name);
                amount.push(parseInt(item.count));
            })
            
            
            if(amount.length===0){
            amount.push(0)
            name.push("No categories added yet")
            }
            setData(amount);
            setCategory(name);
        })
    },[])
    console.log("Data",data);
    return(
        <React.Fragment>
        <div className='container-fluid mt-3 mb-3'>      
        <Chart 
        type="donut"
        width={400}
        series={data}

        options={{
            colors: ['#FF4560', '#00E396','#FEB019','#008FFB', '#775DD0','#CE6B25','#CC63B0','#298900','#1B2E87'],
            plotOptions: {
                pie:{
                    donut:{
                        labels:{
                            show:true
                        }
                    }
                }
            },
            chart: {
                foreColor: '#fff',
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
            labels:category,
            legend: {
                fontSize: '16px',
                show: true,
                position: 'bottom',
              },
              title: {
                text: 'Amount spent in each category',
                offsetX: 22,
              },
        }}
        /></div>
        </React.Fragment>
    )
}

export default Donut;

