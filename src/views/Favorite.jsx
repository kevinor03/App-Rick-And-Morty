// import { connect } from "react-redux";
import Cards from "../components/Cards";
import { useSelector, useDispatch } from "react-redux";
import { orderFavorite, filterFavorite, resetFavorite } from "../redux/Actions";

export default function Favorites() {

    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);

    function handlerSort(e) {
        dispatch(orderFavorite(e.target.value))
    }

    function handlerFilter(e) {
        dispatch(filterFavorite(e.target.value))
    }

    function handlerReset() {
        dispatch(resetFavorite())
    }

    return (
        <div> 
            <select placeholder="Gender" onChange={handlerFilter}>
                {["Male", "Female", "unknown", "Genderless"].map((gender) => (
                    <option value={gender}>{gender}</option>
                ))}
            </select>
            <select placeholder="Order" onChange={handlerSort}>
                {["Asc", "Des"].map((order) => (
                    <option value={order}>{order}</option>
                ))}
            </select>
            <button onClick={handlerReset}>Reset</button>
            <Cards characters={favorites} />
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return {
//        favorites: state.favorites,
//     };
//  }

// export default connect(mapStateToProps, null)(Favorites);