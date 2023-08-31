import { connect } from "react-redux";
import Cards from "../components/Cards";
// import Card from "../components/Card";

function Favorites ({favorites}) {
    return (
        <div> 
            <Cards characters={favorites}/>
            {/* {favorites.map((character) => (
                <Card character={character}/>
            ))} */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
       favorites: state.favorites,
    };
 }

export default connect(mapStateToProps, null)(Favorites);