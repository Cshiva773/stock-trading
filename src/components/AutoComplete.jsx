import {useState,useEffect,useContext} from "react"
import finnhub from "../api/finnhub"
import {WatchListContext} from "../context/watchListContext"
const AutoComplete = () => {
  const [search,setSearch]=useState("")
  const [result,setResult]=useState([])
  const {addStock}=useContext(WatchListContext)
  const renderDropdown=()=>{
    const dropDownClass=search?"show":null
    return(
      <ul style={{
        height:"500px",
        overflowY:"scroll",
        overflowx:"hidden",
        cursor:"pointer"
      }} className={`dropdown-menu ${dropDownClass}`}>
        {result.map((result)=>{
          return(
            <li onClick={()=>{
              addStock(result.symbol)
              setSearch("")
            }} key={result.symbol} className="dropdown-item">{result.description}({result.symbol})</li>
          )
        })}
      </ul>
    )
  }
  useEffect(()=>{
    let isMounted=true
    const fetchData=async()=>{
      try{
        const response=await finnhub.get("/search",{
          params:{
            q:search
          }
        })
        console.log(response)
        if(isMounted){
          setResult(response.data.result)
        }
      }
      catch(err){
        
      }
    }
    if(search.length>0){
      fetchData()
    }else{
      setResult([])
    }
    return()=>(isMounted=false)
  },[search])
  return <div className="w-50 p-5 rounded mx-auto">
    <div className="form-floating mb-3 dropdown">
      <input style={{backgroundColor:"rgba(145,158,171,0.04)"}} id="search" type="text" className="form-control" placeholder="search" autoComplete="off" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
      <label htmlFor="search">Search</label>
      {renderDropdown()}
    </div>
  </div>  
}
export default AutoComplete