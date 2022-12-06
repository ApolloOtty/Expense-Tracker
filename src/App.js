import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/context/AuthProvider';
import Sidebar from './components/Sidebar2';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login';
import Transactions from './pages/Transactions.jsx';
import Signup from './pages/Signup';
import Calculator from './pages/Calculator';
import History from './pages/History';
import Settings from "./pages/Settings";
import axios from 'axios';



const App = () => {


  const [User, SetUser]=useState('');
  const [expense, setExpense]=useState('');
  const [income, setIncome]=useState('');


  useEffect(function(){
    const url="http://localhost/deshboard-sidebar-main/src/api/getExpense.php";
      let fData=new FormData();
      fData.append('userID', localStorage.getItem("userID"));
      axios.post(url, fData)
      .then(response => setExpense(response.data))
      console.log(expense);

      const url2="http://localhost/deshboard-sidebar-main/src/api/getIncome.php";
      axios.post(url2, fData)
      .then(response => setIncome(response.data))
      console.log(income);
  },[]  
  )

  console.log(expense);

  return (
    <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/history" element={<History />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dashboard" element={<Dashboard balance={0} expense={expense} income={income}/>} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
};

export default App;