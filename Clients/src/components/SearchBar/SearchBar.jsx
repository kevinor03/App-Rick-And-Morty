import { useState } from "react";

import { searchContainer, searchInput } from "./SearchBar.style";

export default function SearchBar({ onSearch }) {

   const [id, setId] = useState()

   function changeHandler(event) {
      event.preventDefault();
      setId(event.target.value);
   }

   return (
      <div>
         <input type='search' onChange={changeHandler} value={id} />
         <button onClick={() => { onSearch(id) }}>Buscar</button>
      </div>
   );
}
