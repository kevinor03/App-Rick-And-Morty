import Card from './Card';

export default function Cards(props) {
   const {characters,onClose} = props
   return (<div>
      {characters.map(character => 
      <Card character={character} onClose={onClose}/>
      )}
   </div>);
}
