import '../styles/App.scss'
import { Routes, Route } from "react-router-dom"
import HomePage from '../pages/HomePage/HomePage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { SignupPage } from '../pages/SignupPage/SignupPage';
import { AllDocumentsPage } from '../pages/AllDocumentsPage/AllDocumentsPage';
import { TextEditor } from '../components/TextEditot/TextEditor';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../http/axios.api';
import { setUser } from '../redux/user/user.slice';
import { useEffect, useState } from 'react';
import { Loader } from "../components/Loader/Loader"

function App() {

  const {user} = useSelector((store) => store)
  const dispatch = useDispatch()

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setUser(response.data.user))
    } catch (e) {
      console.log(e)
    }
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth()
    }
    setLoading(false);
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      setLoading(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/documents' element={<AllDocumentsPage/>} />
        <Route path='/documents/:id' element={<TextEditor/>} />
      </Routes>
      )}
    </>
  )
}

export default App
