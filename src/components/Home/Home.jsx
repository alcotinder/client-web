import React, { useReducer, useContext, useEffect, useState } from 'react'
import {UserContext, getState} from '../../context';


const Home = () => {
  
  const {state, dispatch} = getState();
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
      const fetchData = async () => {
      setIsLoading(true)
      const result = await fetch('https://9e477399-5048-4707-9c6a-69c29a777a22.mock.pstmn.io/home')
      const body = await result.json()
      dispatch({ type: 'ADD_INFO', payload:body })
      setIsLoading(false)      
    }
    
    fetchData()
  }, [])


  return (
    <div>
    <h1>
      Home
    </h1>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <label>Your name</label>
        <p>
          {state.name}
        </p>
        <label>Your lastname</label>
        <p>
          {state.lastname}
        </p>
      </div>
    )}
    </div>
    
  )
}

export default Home
