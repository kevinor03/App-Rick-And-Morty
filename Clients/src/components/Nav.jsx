import SearchBar from "./SearchBar/SearchBar";
import { Link } from 'react-router-dom';

export default function Nav({ onSearch, randomize }) {
    return (
        <div>
            <Link to="/about">
                <button>About Me</button>
            </Link>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <Link to="/favorites">
                <button>Favorites</button>
            </Link>
            <Link to="/">
                <button>Log Out</button>
            </Link>
            <SearchBar onSearch={onSearch} />
            <button onClick={randomize}>ADD RANDOM</button>

        </div>
    )
}


