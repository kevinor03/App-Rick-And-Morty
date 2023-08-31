import { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import axios from "axios";

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

   function searchHandler(id) {
      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            return window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   function closeHandler(id) {
      let filtered = characters.filter((character) => character.id !== Number(id))
      setCharacters(filtered);
   }

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
            <Route path='/' element={<Form />}></Route>
            <Route path="/home" element={<Cards characters={characters} onClose={closeHandler} />} />
            <Route path="/about" element={<About />} />
            <Route path="/favorites" element={<Favorites />}/>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="*" element={<Error />} />
         </Routes>

      </div>
   );
}
