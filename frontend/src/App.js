import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
    <div>
 <div>
    <label for="avatar">Choose a picture: </label>
<input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg"></input>
       
 </div>
 <button>upload image</button>
<div>
<label for="start">Start date:</label>
<input type="date" id="start" name="trip-start"
       value="2018-07-22"
       min="2018-01-01" max="2018-12-31"></input>
</div>

<div>
<label for="start">End date:</label>
<input type="date" id="start" name="trip-start"
       value="2018-07-22"
       min="2018-01-01" max="2018-12-31"></input>
</div>
 </div>
 
 </>
 );
  
}

export default App;
