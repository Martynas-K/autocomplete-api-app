import React, {Component} from 'react';
import debounce from '../utils/debounce'
import axios from 'axios';
import spinner from '../assets/spinner.png'

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.apiKey = '0cdf49b653233220028221437161aa9f';
        this.numberOfSuggestions = 8;
        this.state = {
            query: '',
            suggestions: {},
            loading: false,
            message: ''
        }
    }

    onInputChange = (e) => {
        let value = e.target.value;
        this.setQueryValue(value);
    };

    setQueryValue = (value) => {
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
            }, debounce(() => this.fetchQueryData(), 1000));
        }
    };

    fetchQueryData = () => {
        const trimmedQuery = this.state.query.trim();
        if (trimmedQuery.length < 3) {
            return
        }
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${trimmedQuery}`;
        axios.get(url)
            .then(res => {
                const noResultsFoundMsg = !res.data.results.length ? 'No results found.' : '';
                const result = res.data.results.slice(0, this.numberOfSuggestions);
                this.setState({
                    message: noResultsFoundMsg,
                    loading: false,
                    suggestions: result
                });
            })
            .catch(error => {
                if (error) {
                    this.setState({
                        loading: false,
                        message: 'Failed to fetch data from API.'
                        })
                    }
                });
    };

    selectedSuggestion = (value) => {
        this.setState({
            query: value,
            suggestions: {}
        })
    };

    getYearFromFullDate = (date) => {
        return new Date(date).getFullYear();
    };

    renderSuggestions = () => {
        const { suggestions } = this.state;
        if (Object.keys(suggestions).length === 0) {
            return null;
        }
        return (
            <div>
                <ul>{suggestions.map((suggestion) =>
                    <li key={suggestion.id}
                        onClick={() => this.selectedSuggestion(suggestion.original_title)}
                    >
                        <p>{suggestion.original_title}</p>
                        <p>{suggestion.vote_average} Rating, {this.getYearFromFullDate(suggestion.release_date)}</p>
                    </li>)}
                </ul>
            </div>
        )
    };

    render() {
        const { query} = this.state;
        return (
            <div className="container">
                <p>Message: {this.state.message}</p>
                <img src="" alt=""/>
                <div className="search-bar">
                    <input type="text"
                           value={query}
                           onChange={this.onInputChange}
                    />
                    {this.renderSuggestions()}
                </div>
                <img src={spinner} alt="loading..." className={this.state.loading ? "show" : "hide" } />
                <button className="search-btn">Search</button>
            </div>
        )
    }
}

export default SearchBar;