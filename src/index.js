import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import APIData from './api_data';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = APIData.videokey;


class App extends Component {
	constructor(props) {
		super(props);

		this.state = { videos: [] };

		// Due to Downward dataflow only the most parent Component should get access to external APIs
		YTSearch({ key : API_KEY, term : 'fortaleza'}, videos => {
			this.setState({ videos }); // ES6 code for this.setState({ videos: videos });
		});
	}

	render() {
		return (
			<div>
				<SearchBar />
				<VideoDetail video={this.state.videos[0]} />
				<VideoList videos={this.state.videos}/>
			</div>
		);
	}
}

// Instanciate App and place it in div with the class container in the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
