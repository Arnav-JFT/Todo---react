import { useState } from 'react'
import './App.css'
import Spinner from 'react-bootstrap/Spinner';


function App() {
  const [curr, setcurr] = useState("")
  const [todo, settodo] = useState([])
  const [flag, setflag] = useState(false)
  const [currIndex, setcurrIndex] = useState("")
  const [isLoading, setisLoading] = useState(false)

  const submitHandler = (e)=>{
    e.preventDefault()
    setisLoading(true)
    const newArr = [...todo]
    if(flag){
      newArr[currIndex] = curr
      settodo(newArr)
      setcurr("")
      setflag(false)
      return
    }
    newArr.push(curr)
    settodo(newArr)
    setcurr("")
    setTimeout(() => {
      setisLoading(false)
    }, 1000);
  }

  const deleteHandler = (index)=>{
    const newArr = [...todo]
    newArr.splice(index,1)
    settodo(newArr)
  }

  const updateHandler = (index)=>{
    const newArr = [...todo]
    setcurr(newArr[index])
    setcurrIndex(index)
    setflag(true)
  }

  return (
    <div className="App">
      <form style={{marginBottom:"3rem"}} onSubmit={submitHandler}>
        <input required value={curr} onChange={e=>setcurr(e.target.value)} type="text"  />
        <button type="submit">{flag?"Update":"Add"}</button>
      </form>
      {isLoading?
      <Spinner animation="border" variant="dark" />:
      <div>
        {todo.length>0 && todo.map((ele,index)=>{
          return <div style={{marginBottom:"1rem"}} key={index}>
            <span style={{marginRight:"3rem"}}>{ele}</span>
            <span><button onClick={()=>deleteHandler(index)}>Delete</button></span>
            <span><button onClick={()=>updateHandler(index)}>Update</button></span>
            </div>
        })}
      </div>}
    </div>
  )
}

export default App
