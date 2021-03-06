import React,{ useState,createContext,useContext } from 'react';

const ResultContext=createContext()
const baseUrl ='https://google-search3.p.rapidapi.com/api/v1'

export const ResultContextProvider=({children})=>{
    const [results,setResults]= useState([])
    const [isLoading,setIsLoading]= useState(false)
    const [searchTerm,setSearchTerm]= useState('')

    const getResults= async (type)=>{
        setIsLoading(true)

        const response = await fetch(`${baseUrl}${type}`,{
            method: 'GET',
            headers:{
                'x-user-agent': 'desktop',
                'x-proxy-location': 'US',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': 'b5831581admsh169b57465171d72p114d1bjsn1f39c72d89c9'
            }
        })
        const data= await response.json()
        setResults(data)
        setIsLoading(false)
    }
    return(
        <ResultContext.Provider value={{getResults,results,searchTerm,setSearchTerm,isLoading}}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext =()=>useContext(ResultContext)