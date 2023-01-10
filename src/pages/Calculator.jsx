import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar2';
import '../components/calculator.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Bank from "../components/Banks.jsx";

function Calculator() {
    const [initial, setInitial] = useState(1);
    const [lunar, setLunar] = useState(1);
    const [perioada, setPerioada]=useState(1);
    const[cec, setCec]=useState(0);
    const[bcr, setBcr]=useState(0);
    const[brd, setBrd]=useState(0);
    const[brdtext, setbrdtext]=useState('');
    const[raif, setRaif]=useState(0);
    const[raiftext, setRaiftext]=useState('');
    const[garan, setGaran]=useState(0);
    

    const rata=[6.25, 5, 0.55, 2];
    const suma=[];


    const onClickButton1 = (e) => {
        e.preventDefault();
        console.log(initial);
        for(let i=0; i<5; i++){
            if(i===4 && perioada===1)
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(5.75/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            if(i===4 && perioada<=3)
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(6.45/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            else if (i===4 && perioada<=6)
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(6.75/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            else if (i===4)
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(7.05/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            if(i===1)
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(2/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            if(i===2 && parseInt(initial)>=300){
                setbrdtext('');
                if(i===2)
                suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(0.55/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            }else if(i===2 && initial<300){setbrdtext("Suma initiala trebuie sa fie minim 300");}
            if(i===3 && initial>=500){
                setRaiftext('');
            if(i===3 && perioada<=3)
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(6.25/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            else if(i===3 && perioada <= 6)
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(7.25/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            else if (i===3)
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(7.5/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            }else if(i===3 && initial <500){setRaiftext("Depozitul initial trebuie sa fie minim 500");}
            if(i===0 && perioada <= 2)
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(5.7/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            else if(i===0 && perioada === 3)
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(6.7/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            else if(i===0 && (perioada <=6 || perioada < 12))
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(7.2/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            else if(i===0 && (perioada === 12 || perioada < 24))
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(8.2/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            else if(i===0 &&( perioada === 24 || perioada > 24))
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(8.45/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));
            else if(i===0 && perioada === 36)
            suma[i]=Math.round((parseInt(initial)+(parseInt(perioada)*parseInt(lunar)))+(8.7/100)*(parseInt(initial)+(parseInt(perioada)*parseInt(lunar))));

        }   
        console.log(suma);
        setCec(suma[0]);
        setBcr(suma[1]);
        setBrd(suma[2]);
        setRaif(suma[3]);
        setGaran(suma[4]);
      }

    return (
        <div className='maindivcalc'>
            <Sidebar/>
        <div className='maincalc'>
            <div>
            <form>
                <label>Starting Deposit</label>
                <input  min="1" value={initial} onChange={(e) => setInitial(e.target.value)} type="number"></input>
                <label>Periodical Deposits</label>
                <input min="1" value={lunar} onChange={(e) => setLunar(e.target.value)} type="number"></input>
                <label>Period (Months)</label>
                <div className='range'>
                <Box width={300}>
                <Slider onChange={(e) => setPerioada(e.target.value)} defaultValue={1} aria-label="Default" min={1} max={36} valueLabelDisplay="auto" />
                </Box>
                </div>
                <button onClick={onClickButton1} id="search">Search</button>
            </form>
            </div>
            <div className='gridBanci'>
                <div>
                    <div className='cec'>
                        <div>
                        <img src={require('../components/CEC.png')} className='cecimg'/>
                            <p>Banca</p>
                            <p>CEC Bank</p>
                        </div>
                        <div>

                        </div>
                        <div className='textsum'>
                            <p>Suma Acumulata</p>
                            <br></br>
                            <p>{cec}</p>
                        </div>
                    </div>
                    <br></br>
                    <div className='BCR'>
                    <div>
                    <img src={require('../components/BCR.png')} className='bcrimg'/>
                            <p>Banca</p>
                            <p>BCR</p>
                        </div>
                        <div>
            
                        </div>
                        <div className='textsum'>
                            <p>Suma Acumulata</p>
                            <br></br>
                            <p>{bcr}</p>
                        </div>
                    </div>
                    <br></br>
                    <div className='BCR'>
                    <div>
                    <img src={require('../components/BRD.png')} className='brdimg'/>
                            <p>Banca</p>
                            <p>BRD</p>
                        </div>
                        <div>
                           
                        </div>
                        <div className='textsum'>
                            <p>Suma Acumulata</p>
                            <br></br>
                            <p>{brd}</p>
                            <p id='eroare'>{brdtext}</p>
                        </div>
                    </div>
                    <br></br>
                    <div className='BCR'>
                    <div>
                    <img src={require('../components/Raiff.png')} className='raiffimg'/>
                            <p>Banca</p>
                            <p>Raiffeisen</p>
                        </div>
                        <div>

                        </div>
                        <div className='textsum'>
                            <p>Suma Acumulata</p>
                            <br></br>
                            <p>{raif}</p>
                            <p id='eroare'>{raiftext}</p>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className='BCR'>
                    <div>
                    <img src={require('../components/Garanti.png')} className='garantiimg'/>
                            <p>Banca</p>
                            <p>Garanti</p>
                        </div>
                        <div>

                        </div>
                        <div className='textsum'>
                            <p>Suma Acumulata</p>
                            <br></br>
                            <p>{garan}</p>
                        </div>
                    </div>
            </div>
            
        </div>
        </div>
    );
};

export default Calculator;
