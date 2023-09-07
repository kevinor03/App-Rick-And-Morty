import { useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

export default function Detail() {
    const [character, setCharacter] = useState({});
    const { id } = useParams();

    useEffect(() => {
        //https://rickandmortyapi.com/api/character/${id}
        axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
            if (data.name) {
                setCharacter(data);
            }
        });
        return setCharacter({})
    }, [id])

    return (
        <div>
            <div>
                <h3>{character.name}</h3>
                <img src={character.image} alt={character.name}></img>
            </div>
            <div>
                <div>
                    <h3>Status:</h3>
                    <p>{character.status}</p>
                </div>
                <div>
                    <h3>Specie:</h3>
                    <p>{character.species}</p>
                </div>
                <div>
                    <h3>Gender:</h3>
                    <p>{character.gender}</p>
                </div>
                <div>
                    <h3>Origin:</h3>
                    <p>{character.origin?.name}</p>
                </div>
            </div>
        </div>
    )
}

