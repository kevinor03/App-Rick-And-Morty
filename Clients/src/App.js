import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { useDispatch } from 'react-redux';
import { removeFavorite } from './redux/Actions.js';

import Cards from './components/Cards.jsx';
import Nav from './components/Nav.jsx';
import About from "./views/About.jsx"
import Detail from './views/Detail.jsx';
import Error from './views/ErrorPage.jsx';
import Form from './views/Form.jsx';
import Favorites from './views/Favorite.jsx';

export default function App() {
   const location = useLocation();
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const dispatch = useDispatch()
   const navigate = useNavigate();

   const EMAIL = 'kevin@gmail.com';
   const PASSWORD = 'password4';

   // access 
   function login(userData) {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home');
      }
   }
   // access
   useEffect(() => {
      !access && navigate('/');
      //esLint-disable-next-Line
   }, [access]);
   // nav bar
   function searchHandler(id) {
      if (id <= 0 || id > 826) {
         return window.alert("¡No hay personajes con ese ID!")
      }
      // https://rickandmortyapi.com/api/character/${id}
      axios(`http://localhost:3001/rickandmorty/character/${id}`)
         .then(({ data }) => {
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               window.alert("Introduzca un ID de Personaje");
            }
         });
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
