import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { useDispatch } from 'react-redux';
import { removeFavorite } from './redux/Actions.js';

import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav.jsx';
import About from "./views/About.jsx"
import Detail from './views/Detail.jsx';
import Error from './views/ErrorPage.jsx';
import Form from './views/Form.jsx';
import Favorites from './views/Favorite.jsx';

import "./App.css"

export default function App() {
   const location = useLocation();
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(true);

   const dispatch = useDispatch()
   const navigate = useNavigate();

   // access 
   async function login(userData) {
      try {
         const { email, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/';
         const { data } = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;
         setAccess(data);
         access && navigate('/home');
      } catch (error) {
         alert(error)
      }
   }
   // access
   useEffect(() => {
      !access && navigate('/');
      //esLint-disable-next-Line
   }, [access]);
   // nav bar
   async function searchHandler(id) {
      try {
      // https://rickandmortyapi.com/api/character/${id}
         const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               throw new Error("Introduzca un ID de Personaje");
            }
      } catch (error) {
         alert(error)
      }  
   }
   // button close
   function closeHandler(id) {
      let filtered = characters.filter((character) => character.id !== Number(id))

      dispatch(removeFavorite(id))

      setCharacters(filtered);
   }
   // button random id
   function randomHandler() {

      let rom = []
      let randomId = (Math.random() * 826).toFixed();

      randomId = Number(randomId);

      if (!rom.includes(randomId)) {
         rom.push(randomId)
         searchHandler(randomId)
      } else {
         alert("Ese personaje ya fua agregado");
         return;
      }
   }

   return (
      <div className='App'>
         <h1 className={'title'}>App de Rick And Morty</h1>
         {location.pathname === "/" ? null : <Nav onSearch={searchHandler} randomize={randomHandler} />}

         <Routes>
            <Route path='/' element={<Form login={login} />}></Route>
            <Route path="/home" element={<Cards characters={characters} onClose={closeHandler} />} />
            <Route path="/about" element={<About />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="*" element={<Error />} />
         </Routes>

      </div>
   );
}
