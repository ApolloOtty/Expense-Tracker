import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import "../components/linechart.css";
import { dark } from '@mui/material/styles/createPalette';
import { fontSize, style } from '@mui/system';

const Percent = ({percent}) => {

    return(
        <React.Fragment>
        <div className='container-fluid mt-3 mb-3'>      
        <Chart 
        type="radialBar"
        width={220}
        height={220}
        series={[
            percent
        ]}

        options= {{
            chart: {
              height: 350,
              type: 'radialBar',
              toolbar: {
                show: true
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: -180,
                endAngle:177,
                 hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#1A2D3F',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.20
                  }
                },
                track: {
                  background: '#1A2D3F',
                  strokeWidth: '67%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -15,
                    show: true,
                    color: '#888',
                    fontSize: '17px'
                  },
                  value: {
                    formatter: function(val) {
                      return parseInt(val);
                    },
                    color: '#F2FAFF',
                    offsetY: -4,
                    fontSize: '35px',
                    show: true,
                  }
                }
              }
            },
            fill: {
              colors: [function({ value }) {
                  if(value < 51) {
                      return '#4CFF00'
                  } else if (value >= 51 && value < 80) {
                      return '#FFD800'
                  } else {
                      return '#FF0000'
                  }
              }],
          },
            stroke: {
              lineCap: 'round'
            },
            labels: ['']
        }}

        /></div>
        </React.Fragment>
    )
}
export default Percent;

