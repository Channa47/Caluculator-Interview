import React, { useState } from "react";
import "./Styles/Mian.css";
function Main() {
  const [History, setHistory] = useState([]);
  const [CaluculatedTotal, setCalucaulatedTotal] = useState(0);
  const [LeftHandSIde, setLefthandSIde] = useState([]);
  const [RightHandleSIde, setRightHandSIde] = useState([]);
  const [isLeft, setisLEft] = useState(true);
  const [CurrentCal, setCurrentCal] = useState(0);
  const [Typing, setTyping] = useState([]);
  const [isTyping, setisTyping] = useState(false);
  const [ShowHistory , setShowHiustory] = useState(false);
 const [HistoryData,setHistoryData] = useState([]);
  const HandleNumberClick = (e) => {
    const buttonText = e.target.innerText;
    
    setTyping((prev => [...prev,buttonText]))
    if (isLeft) {
      setLefthandSIde((prevData) => [...prevData, buttonText]);
    } else {
      setRightHandSIde((prevData) => [...prevData, buttonText]);
      setisTyping(true)
    }
  };
  const HandleCalculationClick = (e) => {
    setisLEft(false);
    setisTyping(true);
    // console.log(e.target.innerText);
    setCurrentCal(e.target.innerText);
    console.log(e.target.innerText)
    const buttonText = e.target.innerText;
    setTyping((prev => [...prev,buttonText]))
  };

  const Caluculate = () => {
    console.log(LeftHandSIde);
    console.log(RightHandleSIde);
    let LHS = Number(LeftHandSIde.join(""));
    let RHS = Number(RightHandleSIde.join(""));
    if (CurrentCal === "+") {
      let Total = LHS + RHS;
      setCalucaulatedTotal(Total);
    } else if (CurrentCal === "-") {
      let Total = Number(LHS) - Number(RHS);
      setCalucaulatedTotal(Total);
    } else if (CurrentCal === "%") {
      let Total = LHS % RHS;
      console.log(Total)
      setCalucaulatedTotal(Total);
    } else if (CurrentCal === "x") {
      let Total = LHS * RHS;
      setCalucaulatedTotal(Total);
    } else if (CurrentCal === "") {
      alert("Invalid");
    } else if (CurrentCal === "÷") {
      let Total = LHS / RHS;
      setCalucaulatedTotal(Total);
    }
    
  };
  
  const HandleClear = () => {
    setCalucaulatedTotal(0);
    setCurrentCal("");
    setLefthandSIde([]);
    setRightHandSIde([]);
    let History = JSON.parse(localStorage.getItem("history")) ||  [];
    console.log(Typing , CaluculatedTotal)
    History.push(...Typing,CaluculatedTotal,"=");
    localStorage.setItem("history",JSON.stringify(History));
    window.location.reload()
  };

  const GetHistory = () =>{
    setShowHiustory(true)
    let History = JSON.parse(localStorage.getItem("history")) ||  [];
    setHistoryData(History)
  }
  return (
    <div id="Calsi_Container">
      {!ShowHistory ? 
       <div>
        <button onClick={GetHistory}>Show History</button> 
        <button onClick={()=>localStorage.clear()}>Clear History</button> 
       </div>
      : <div className="Items_Container">
        
         {HistoryData.length > 0 ?
          HistoryData.map((e)=>{
            return(
                <span>{e}</span>
            )
          })
         
         : "No History Found"}
        </div>}
      
      
      <br />
      <br />
      <div className="Items_Container">{Typing} {isTyping && "="}{CaluculatedTotal}</div>
      <br />
      <br />
      <div className="Items_Container" id="ButtonsContainer">
        <button className="OtherCalucalutionStyele" onClick={HandleClear}>
          C
        </button>
        <button className="OtherCalucalutionStyele">+/-</button>
        <button className="OtherCalucalutionStyele" onClick={HandleCalculationClick}>
          %
        </button>
        <button className="CalucationsStyle" onClick={HandleCalculationClick}>
          &#x000F7;
        </button>
        <button onClick={HandleNumberClick}>7</button>
        <button onClick={HandleNumberClick}>8</button>
        <button onClick={HandleNumberClick}>9</button>
        <button className="CalucationsStyle" onClick={HandleCalculationClick}>
          x
        </button>
        <button onClick={HandleNumberClick}>4</button>
        <button onClick={HandleNumberClick}>5</button>
        <button onClick={HandleNumberClick}>6</button>
        <button className="CalucationsStyle" onClick={HandleCalculationClick}>
          -
        </button>
        <button onClick={HandleNumberClick}>1</button>
        <button onClick={HandleNumberClick}>2</button>
        <button onClick={HandleNumberClick}>3</button>
        <button className="CalucationsStyle" onClick={HandleCalculationClick}>
          +
        </button>
        <button onClick={HandleNumberClick}>0</button>
        <button onClick={HandleNumberClick}>.</button>
        <button className="CalucationsStyle" onClick={Caluculate}>
          =
        </button>
      </div>
    </div>
  );
}

export default Main;
