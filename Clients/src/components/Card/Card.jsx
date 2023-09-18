import { connect } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import style from "./Card.module.css"

function Card(props) {
   const navigate = useNavigate()
   const { character, onClose, favorites, addFavorite, removeFavorite } = props
   const { name, gender, species, id } = character

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
      <div className={style.cardContainer}>
         <div className={style.imageContainer}>
            {closeBtn && (<button className={style.closeButton} onClick={() => { onClose(id) }}>X</button>)}
            <img className={style.characterImage} src={character.image} alt={name} onClick={navigateHandler} />
            <h2 className={style.name}>{name}</h2>
            {
               fav ? (
                  <button onClick={() => { handleFavorite(id) }}>❤️</button>
               ) : (
                  <button onClick={() => { handleFavorite(character) }}>🤍</button>
               )
            }
         </div>
         <div className={style.atributes}>
            <h2> {gender} </h2>
            <h2> {species} </h2>
         </div>
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