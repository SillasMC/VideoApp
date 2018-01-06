import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';


// Create class App
const App = () => {
	return (
		<div>
			<SearchBar />
		</div>
	);
}

// Instanciate App and place it in div with the class container in the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
