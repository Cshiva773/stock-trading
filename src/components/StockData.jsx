import {useState,useEffect} from "react"
import finnHub from "../api/finnhub"
export const StockData=({symbol})=>{
  const[stockData,setStockData]=useState()
  let isMounted=true;
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await finnHub.get("/stock/profile2",{
          params:{
            symbol
          }
        })
        console.log(response)
        if(isMounted){
          setStockData(response.data)
        }
      }
      catch(err){
        
      }
    }
    fetchData()
    return ()=>(isMounted=false)
  },[symbol])
  return <div>
    
  </div>
}