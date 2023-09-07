import { connect } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/Actions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Card(props) {
   const navigate = useNavigate()
   const { character, onClose, favorites, addFavorite, removeFavorite } = props
   const { name, gender, id } = character

   const [closeBtn, setCloseBtn] = useState(true)
   const [fav, setFav] = useState(false)

   useEffect(() => {
      if (!onClose) {
         setCloseBtn(false)
      }
   }, [])

   useEffect(() => {
      favorites.forEach((fav) => {
         if (fav.id === id) {
            setFav(true)
         }
      })
   }, [favorites]);

   function navigateHandler() {
      navigate(`/detail/${character.id}`);
   }

   function handleFavorite(character) {
      if (!fav) {
         addFavorite(character)
         setFav(true)
      } else {
         removeFavorite(character)
         setFav(false)
      }
   }

   return (
      <div>
         {closeBtn && (<button onClick={() => { onClose(id) }}>X</button>)}

         <h2>name: {name}</h2>
         <h2>gender: {gender}</h2>
         {
            fav ? (
               <button onClick={() => { handleFavorite(id) }}>❤️</button>
            ) : (
               <button onClick={() => {handleFavorite(character)}}>🤍</button>
            )
         }
         <img src={character.image} alt={name} onClick={navigateHandler} />
      </div>
   );
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFavorite: (character) => dispatch(addFavorite(character)),
      removeFavorite: (id) => dispatch(removeFavorite(id))
   }
}

const mapStateToProps = (state) => {
   return {
      favorites: state.favorites,
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
// export default Card