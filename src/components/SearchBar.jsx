import React, {Component} from 'react';
import debounce from '../utils/debounce'
import axios from 'axios';
import SuggestionItem from "./SuggestionItem";
import spinner from '../assets/SearchBar/spinner.svg'

class SearchBar extends Component {
    apiKey = '0cdf49b653233220028221437161aa9f';
    numberOfSuggestions = 8;
    debounceTime = 1000;
    state = {
        query: '',
        suggestions: {},
        message: '',
        loading: false,
        inputActive: false
    };

    onInputChange = (e) => this.setQueryValue(e.target.value);

    setQueryValue = (value) => {
        this.setState({inputActive: false});
        if (value) { this.setState({inputActive: true})}
        if (value.trim().length < 3) {
            this.setState({
                query: value,
                suggestions: {},
                message: ''
            });
        } else {
            this.setState({
                query: value,
                loading: true,
            }, debounce(() => this.fetchQueryData(), this.debounceTime));
        }
    };

    fetchQueryData = () => {
        const trimmedQuery = this.state.query.trim();
        if (trimmedQuery.length < 3) {
            this.setState({loading: false});
            return;
        }
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${trimmedQuery}`;
        axios.get(url)
            .then(res => {
                const noResultsFoundMsg = !res.data.results.length ? 'No results found.' : '';
                const result = res.data.results.slice(0, this.numberOfSuggestions);
                this.setState({
                    message: noResultsFoundMsg,
                    loading: false,
                    suggestions: result,
                    inputActive: true,
                });
            })
            .catch(error => {
                if (error) {
                    this.setState({
                        loading: false,
                        message: 'Failed to fetch data from API.'
                    });
                }
            });
    };

    selectedSuggestion = (value) => {
        this.setState({
            query: value,
            suggestions: {},
            inputActive: false
        });
    };

    renderSuggestions = () => {
        const {suggestions, message} = this.state;
        if (Object.keys(suggestions).length === 0) {
            if (message) {
                return ( <div className="dropdown__item">{message}</div> );
            } else { return }
        }
        return (
            <SuggestionItem suggestions={suggestions} selectedSuggestion={this.selectedSuggestion} />
        )
    };

    onSearchButtonClick = () => { window.location.reload() };

    render() {
        const {query, inputActive, loading} = this.state;
        return (
            <div className="search-bar">
                <div className="search-bar__container">
                    <div className="input">
                        <div className="input__movie-icon">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="25" height="25" viewBox="0 0 512 512">
                                <path d="M352,255.5l-192,96v-192L352,255.5z M512,31.5v448H0v-448H512z M320,95.5h64v-32h-64V95.5z M224,95.5h64v-32h-64V95.5z
                                        M128,95.5h64v-32h-64V95.5z M32,95.5h64v-32H32V95.5z M96,415.5H32v32h64V415.5z M192,415.5h-64v32h64V415.5z M288,415.5h-64v32h64
                                        V415.5z M384,415.5h-64v32h64V415.5z M480,415.5h-64v32h64V415.5z M480,127.5H32v256h448V127.5z M480,63.5h-64v32h64V63.5z"
                                      fill="white"/>
                            </svg>
                        </div>
                        <div className={`input__suggestions-wrapper ${inputActive ? "input__suggestions-wrapper--active" : ""}`}>
                            <div className={`input__suggestions-movie-icon ${!inputActive ? "hide" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="20" height="20" viewBox="0 0 512 512">
                                    <path d="M352,255.5l-192,96v-192L352,255.5z M512,31.5v448H0v-448H512z M320,95.5h64v-32h-64V95.5z M224,95.5h64v-32h-64V95.5z
                                        M128,95.5h64v-32h-64V95.5z M32,95.5h64v-32H32V95.5z M96,415.5H32v32h64V415.5z M192,415.5h-64v32h64V415.5z M288,415.5h-64v32h64
                                        V415.5z M384,415.5h-64v32h64V415.5z M480,415.5h-64v32h64V415.5z M480,127.5H32v256h448V127.5z M480,63.5h-64v32h64V63.5z"
                                          fill="black"/>
                                </svg>
                            </div>
                            <input className={`input__text-field ${inputActive ? "input__text-field--active" : ""}`}
                                  type="text"
                                  placeholder="Enter movie name"
                                  value={query}
                                  onChange={this.onInputChange}
                            />
                            {this.renderSuggestions()}
                        </div>
                    </div>
                    <button className={`search-bar__button ${inputActive ? "hide" : ""}`}
                            onClick={this.onSearchButtonClick}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="35" height="35" viewBox="0 0 92 92">
                            <path
                                d="M20.8 39.27c0-11.016 8.808-19.976 19.637-19.976 10.827 0 19.635 8.96 19.635 19.972 0 11.014-8.808 19.976-19.635 19.976-10.83
                            0-19.64-8.96-19.64-19.976zm55.472 32.037l-15.976-16.25c3.357-4.363 5.376-9.835 5.376-15.788 0-14.16-11.32-25.67-25.232-25.67-13.923
                            0-25.24 11.51-25.24 25.67s11.32 25.67 25.237 25.67c4.776 0 9.227-1.388 13.04-3.74L69.84 77.85c1.77 1.8 4.664 1.8 6.432 0 1.77-1.8 1.77-4.744 0-6.544z"
                                fill="#ff690f"/>
                        </svg>
                    </button>
                </div>
                <img src={spinner} alt="loading..." className={`spinner ${loading ? "" : "hide"}`}/>
            </div>
        )
    }
}

export default SearchBar;