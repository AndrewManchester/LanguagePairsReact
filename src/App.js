import './App.css';
import React, { useState } from 'react';

function App() {
 
function fisherYatesShuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
}
  
let data = [ "A1,B1",
             "A2,B2", 
             "A3,B3",
             "A4,B4", ]
             
  //For the card faces logic
  const SELECTED = "SELECTED"
  const COMPLETED = "COMPLETED"
  const WRONG = "WRONG"
  const FREE = "FREE"
    
function convert() {
   let workWith = []
   let temp = {  text: "11111",
                 identity: 9999,
                 status: FREE,
    } 
   data.forEach( (item,index) => { 
      let [a,b] = item.split(",")
       workWith.push( {...temp,
                      identity: index,
                      text:a })
       workWith.push( {...temp,
                      identity: index,
                      text:b })
        
     
    })
    fisherYatesShuffle(workWith)
    return workWith
}
   
  const [cards, setCards] = useState(convert());
  const [expected, setExpected] = useState(-99)
  const [currentCardIndex, setcurrentCardIndex] = useState(-99)
  const [state, setState] =useState("START")
  
  //For the game logic
  const START = "START"
  const WAIT = "WAIT"
 

  function setCardStatus(index, state) {
    setCards( prev => {
      const update = prev.map((item, j) => {
        if (j == index) {
          return { ...item, 
                 status: state};
        } else {
          return item;
        }
      }) 
    return update
   })
  
}

  function setCardStatusTwoCards(index, state) {
    setCards( prev => {
      const update = prev.map((item, j) => {
        if (item.identity == index) {
          return { ...item, 
                 status: state};
        } else {
          return item;
        }
      }) 
    return update
   })
  
}

  function steps(event){
    let index = event.target.getAttribute('data-other-attr')  
    //Do index check on 99 first
    if ( index == -99  || cards[index].status === COMPLETED) return
    if (state === START) {
       setcurrentCardIndex(index)
       setExpected(cards[index].identity)
       setCardStatus(index,SELECTED)
       setState(WAIT)
       return /////NOTE force return here
    }
    if (state === WAIT) {
       if (index === currentCardIndex) {
           //Pressed same card
           setCardStatus(index,FREE)
           setState(START)
       } 
       else {
           if (cards[index].identity === expected) {
              setCardStatusTwoCards(cards[index].identity,COMPLETED)
              setState(START)
           } else {
             setCardStatus(index,WRONG)
             setTimeout(() => {setCardStatus(index,FREE)}, 1000)
           }
       }
     }
    
    
    }

 function actualCards(item,index) {
     let x = { 'data-other-attr': index}
     switch (item.status) {
        case SELECTED: {
          return (
             <div className="card"  key={index} style={{backgroundColor: 'green'}}
              {...x} >
              {item.text}
              </div>  
              )
          break; 
        }
        case COMPLETED: {
          return (
             <div className="card"  key={index} style={{backgroundColor: 'grey'}}
              {...x} >
              </div>  
              )
          break; 
        }
        case FREE: {
          return (
             <div className="card"  key={index} style={{backgroundColor: 'blue'}}
              {...x} >
              {item.text}
              </div>  
              )
          break; 
        }
        case WRONG: {
          return (
             <div className="card"  key={index} style={{backgroundColor: 'red'}}
              {...x} >
              WRONG
              </div>  
              )
          break; 
        }
        default: {}
     }
   
 }
 
  return (
   <div>
   <div data-other-attr="-99" onClick={(e) => steps(e)} className="cards">
     
     {cards.map( (item,index) => {
        return    actualCards(item, index)
          })
     }
  </div>
  </div>
  )
}

export default App;
