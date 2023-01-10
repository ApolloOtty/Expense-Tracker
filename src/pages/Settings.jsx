import Sidebar from '../components/Sidebar2';
import '../components/settings.css';
import axios from '../api/axios.js';
import Line from "../components/limitGraph.jsx"
import Percent from "../components/percent.jsx"
import React, { useState, useEffect } from 'react';
import History2 from "../components/History2.jsx";
import moment from 'moment';
import { RepeatOneSharp } from '@mui/icons-material';


function MyComponent() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [fieldValue, setFieldValue] = useState(0);
  const [limit, setLimit] = useState(0);
  const [percent, setPercent] = useState(0);
  const[textPercentage, setTextPercentage]=useState("");
  const[min, setMin]=useState(0);
  const[max, setMax]=useState(0);
  const[textMin, setTextMin]=useState("");
  const[textMax, setTextMax]=useState("");
  const[textFilter, setTextFilter]=useState("");
  const[date, setDate]=useState(null);

  const[val, setVal]=useState([]);


    useEffect(function(){
        const url="http://localhost/deshboard-sidebar-main/src/api/dateFilter.php";
          let fData=new FormData();
          fData.append('userID', localStorage.getItem("userID"));
          fData.append('date', date);
          axios.post(url, fData)
          .then(response => { setVal(response.data)
          if(response.data.length==0)
          setTextFilter("There are no transactions available on the chosen date!");
          else setTextFilter("");
    })
    },[date] 
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

  const [user, setUser] = useState({
    name: 'John Doe',
    email: localStorage.getItem('email'),
    location: 'New York, NY',
    bio: 'I am a software developer with a passion for building useful and intuitive applications.',
    interests: ['coding', 'music', 'hiking']
  });
  const[textLimit, setTextLimit] = useState("Do you want to add a spending limit to your account?")

  useEffect(() => {
    const percentage = (localStorage.getItem("lastElementBalance") / localStorage.getItem("lastElementLimit")) * 100;
    localStorage.setItem("percent", percentage);


    if (percentage<=90){
      const color = percentage > 59 ? 'yellow' : 'green';
      setTextPercentage(`You are <span style="color: ${color}">${percentage.toFixed(0)}%</span> on your way to your spending limit.`)
    }else{
      const color = percentage > 79 ? 'red' : 'yellow';
      setTextPercentage(`You are <span style="color: ${color}">${percentage.toFixed(0)}%</span> on your way to your spending limit. Please be mindful of your spending.`);
    }
    if(percentage==100){
      const color = percentage > 79 ? 'red' : 'yellow';
      setTextPercentage(`<span style="color: ${color}"> You have reached your spending limit! Please be mindful of your spending.</span>`);
    }else if (percentage>100){
      const color = percentage > 79 ? 'red' : 'yellow';
      setTextPercentage(`You went over your spending limit by <span style="color: ${color}">${percentage.toFixed(0)}%</span>! Please be mindful of your spending.`);
    }



    const url3="http://localhost/deshboard-sidebar-main/src/api/getMinMax.php";
            let fData3=new FormData();
            fData3.append('userID', localStorage.getItem('userID'));
            axios.post(url3, fData3)
            .then((response) => {
              console.log(response.data[0].max_category);
          setMin(parseInt(response.data[0].min_sum));
          setMax(parseInt(response.data[0].max_sum));
          setTextMin((response.data[0].min_category));
          setTextMax((response.data[0].max_category));
          console.log("MIN", textMin);
      });
    



    const url="http://localhost/deshboard-sidebar-main/src/api/limit2.php";
            let fData=new FormData();
            fData.append('userID', localStorage.getItem('userID'));
            fData.append('limit', limit);
            axios.post(url, fData)
            .catch(function (error) {
                if (error.response) {
                  setTextLimit("Spending limit added! Spend mindfully!")
                  setIsDisabled(!isDisabled)
            }
        }).then((response) => {
          setLimit(parseInt(response.data.spendingLimit));
      });
      const url2="http://localhost/deshboard-sidebar-main/src/api/getLimit.php";
            let fData2=new FormData();
            fData2.append('userID', localStorage.getItem('userID'));
            fData2.append('limit', limit);
            axios.post(url2, fData2)
        .then((response) => {
          setLimit(parseInt(response.data.spendingLimit));
          console.log(response.data.spendingLimit)
          setFieldValue(response.data.spendingLimit);
      });
  }, []); // run the effect only once when the component mounts

  useEffect(() =>{
    const url="http://localhost/deshboard-sidebar-main/src/api/insertBalance.php";
    console.log(localStorage.getItem("balance"))
        let fData=new FormData();
        fData.append('balance', localStorage.getItem("balance"));
        fData.append('userID', localStorage.getItem("userID"));
        axios.post(url, fData)
        .catch(function (error) {

    }).then((response) => {
        if (response) {
                console.log(response.data.balance);
        }}
    );

    const percentage = (localStorage.getItem("lastElementBalance") / localStorage.getItem("lastElementLimit")) * 100;

    const url4="http://localhost/deshboard-sidebar-main/src/api/sendEmail.php";
    let fData4=new FormData();
    fData4.append('percent', percentage.toFixed(0));
    fData4.append('email', user.email);
    axios.post(url4, fData4).then((response=>{}));

},[localStorage.getItem("balance")])

  const handleLimit = async (e) => {
    setIsDisabled(!isDisabled)
    setTextLimit("Spending limit added! Spend mindfully!")
    e.preventDefault()
    setFieldValue(limit);

    const url="http://localhost/deshboard-sidebar-main/src/api/limit.php";
            let fData=new FormData();
            fData.append('userID', localStorage.getItem('userID'));
            fData.append('limit', limit);
            axios.post(url, fData)
            .catch(function (error) {
                if (error.response) {
                  alert("An account is already registered with this email!")
            }
        }).then((response) => {
            if (response) {
              console.log(response) // I show error here         
            }});
  }

  return (
    <div className='maindivsett'>
      <link href="https://fonts.googleapis.com/css?family=Archivo:500|Open+Sans:300,700" rel="stylesheet"></link>       
        <Sidebar/>
        <div className='mainsettings'> 
         <h1 className='yourprofile'>WELCOME TO YOUR PROFILE</h1>
         <br></br>
            <div className='hellouser'>
              <h1>Hello, </h1>
              <br></br>
              <h1><b>{user.email}</b></h1>
              <div className='procent'dangerouslySetInnerHTML={{ __html: textPercentage }}/>
            </div> 
            <br></br>
            <br></br>
            <div className='howyoudid'>
            <div>
              <h1><b>Here's how you did this month:</b></h1>
            </div>
          <br></br>
        <div className='mainmoneyspent'>

          <div className='spentmoney'>
            <div className='moneytext'>
              <p>You spent <b>most</b> money on</p>
            </div>
            <div className='amountmoneytext'>
              <h2>{textMax} <br></br>{max}</h2>
            </div>
          </div>

          <div className='spentmoney'>
            <div className='moneytext'>
              <p>You spent <b>least</b> money on</p>
            </div>
            <div className='amountmoneytext'>
              <h2> {textMin}  <br></br>{min}</h2>
              </div>
            </div>
          </div>

        </div>
        <br></br>
        <br></br>
        <div className='limitdiv'>
          <h1 className='textlimit'>{textLimit}</h1>
          <div className='limitform'>
            <form onSubmit={handleLimit}>
              <div className='limitnumber'>
                <h1>Spending limit</h1>
              </div>
              <div className='limitinput'>
                <input disabled={isDisabled} autocomplete="off" type="number" placeholder="Enter limit" name="user" required onChange={(e) => setLimit(e.target.value)} value={limit}></input>
              </div>
              <button disabled={isDisabled}>Apply</button>
            </form>
            <div className='percent'>
                <Percent percent={localStorage.getItem("percent")}></Percent>
            </div>
          </div>
        </div>
          <br></br>
          <br></br>
          <div className='linechart'>
            <Line></Line>
          </div>
          <br></br>
          <br></br>
          <div className='datafilter'>
          <input type="date" onChange={event => setDate(event.target.value)}  value={date}/>
         
          <table className='scrollable2'> 
          <h1 className='textFilter'>{textFilter}</h1>
                {val.map((cat) => (
              <tr>
                <td  className='firsttd2'><p className='date'>{cat.date}</p>{cat.categoryName}</td>
                <td className='secondtd2' style={{ color: `${checkColor(cat.type)}` }}> {checkType(cat.type) ? '-' : '+'} {cat.amount} lei</td>
              </tr>
              ))}
            </table>  
          </div>
        </div>
    </div>
  );
}

export default MyComponent;
