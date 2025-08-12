import './homePag.css'
import Spinner from '../../components/Spinner';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function HomePag() {
  const [spinner, setSpinner] = useState(false)

  const navigate = useNavigate();

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (!localStorage.getItem("autenticador")) {
      navigate("/", { replace: true })
    }
  }, [navigate]);

  async function LogoutPag() {
    setSpinner(true)
    await delay(1000)
    localStorage.removeItem("autenticador");
    navigate("/", { replace: true })
  }

  return (
    <div className='container'>
      <p className='p'>LOGIN EFETUADO COM SUCESSO :)</p>
      <button
        className='btn-Logout'
        type='button'
        onClick={LogoutPag}>{spinner ? <Spinner /> : "Logout"}</button>
    </div >

  )
}