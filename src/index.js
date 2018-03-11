import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import APIData from './api_data';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = APIData.videokey;


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('fortaleza');
	}

	videoSearch(term) {
		// Due to Downward dataflow only the most parent Component should get access to external APIs
		YTSearch({ key : API_KEY, term : term}, videos => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		// Call the function only after 300ms
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos}/>
			</div>
		);
	}
}

// Instanciate App and place it in div with the class container in the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
