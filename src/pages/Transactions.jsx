import React from 'react';
import Sidebar from '../components/Sidebar2';
import { useRef, useState, useContext, useEffect} from 'react';
import './transactions.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { pink } from '@mui/material/colors';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { fontSize } from '@mui/system';
import axios from '../api/axios.js';

const Transcations = () => {
  console.log((localStorage.getItem("balance")));
  const userRef = useRef();
  const errRef = useRef();
  const [type, setType] = useState('');
  const [tip, setTip] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const[amount, setAmount] = useState(1);


  const categoryCreate = async (e) => {
    if(name.trim().length != 0){
      if(type!=''){
        const url="http://localhost/deshboard-sidebar-main/src/api/categoryCreate.php";
        let fData=new FormData();
        fData.append('type', type);
        fData.append('name', name);
        fData.append('userID', localStorage.getItem("userID"));
        axios.post(url, fData)
        .catch(function (error) {
            if (error.response) {
              alert("There is already a category with that name!")
        }
    }).then((response) => {
        if (response) {
          console.log(response) // I show error here          
        }});
    }else alert("Type can't be empty!")
  }else alert("Name can't be empty!")}

    const transactionCreate = async (e) => {
      
      e.preventDefault() 
      let fData=new FormData();
        fData.append('userID', localStorage.getItem("userID"));
        fData.append('category', category);
         /* const url2="http://localhost/deshboard-sidebar-main/src/api/verifyType.php";
          axios.post(url2, fData)
            .then(response => setTip(response.data)
            )
            if((localStorage.getItem("balance"))!==null && tip!=='expense'){*/
            

      if(category.trim().length != 0){
      
        
            
          const url="http://localhost/deshboard-sidebar-main/src/api/createTransaction.php";
          console.log(category);
          fData.append('amount', amount);
          axios.post(url, fData)
          .catch(function (error) {
              console.log(error);
      }).then((response) => {
          if (response) {
            // I show error here        
          }});
      }else alert("Select a category!")//}else alert("You can't add an expense when your balance is 0! Add an income first")
    }


      const[val, setVal]=useState([]);
      console.log("categ",category);

      useEffect(function(){
          const url="http://localhost/deshboard-sidebar-main/src/api/getCategory.php";
            let fData=new FormData();
            fData.append('userID', localStorage.getItem("userID"));
            axios.post(url, fData)
            .then(response => setVal(response.data))
      },[]  
      )
      

    return (
      <>
        <div className='main'>
            <div className='radio'>
            <Sidebar/>
            <h1 className='transtitle'>Create Category</h1>
            <br></br>
            <div className='addcate'>
              <div className='addcate2'>
            <form onSubmit={categoryCreate}>
            <div class="wrapper">
      <input onChange={(e) => setType(e.target.value)} value={"income"} type="radio" name="select" id="option-1"></input>
      <input onChange={(e) => setType(e.target.value)} value={"expense"} type="radio" name="select" id="option-2"></input>
      <label for="option-1" className="option option-1">
        <div className="dot"></div>
        <span>Income</span>
      </label>
      <label for="option-2" className="option option-2">
        <div className="dot"></div>
        <span>Expense</span>
      </label>
    </div>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div className='maintransinfo'>
    <div>
      <TextField sx={{
        input: { color: 'white' },
        width: { sm: 200, md: 300 },
        "& .MuiInputBase-root": {
            height: 80
        }
    }}  InputLabelProps={{style: {fontSize: 20}, style: { color: '#fff' }}} inputProps={{style: {fontSize: 25}}} id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} value={name}/></div>
      </div>

      
    </Box>
    <button type="submit" value="Submit" className='submit'>Submit</button> 
            </form>  
            </div>
            </div>
            <br></br>
            <br></br>
            <h1 className='transtitle'>Add Transaction</h1>
            <div className='addtrans'>
            <form onSubmit={transactionCreate}>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className='category'>
            <option hidden>Choose one</option>
              {val.map((cat) => (
              <option value={cat}>{cat}</option>
              ))}
          </select>
              <label className='amount'>Amount</label>
                <input onChange={(e) => setAmount(e.target.value)} value={amount} min="1" type="number" className='amount'></input>
                <button type="submit" value="Create" className='create'>Create</button> 
              </form>
            </div>
        </div>
       
        </div>
        </>
    );
};

export default Transcations;