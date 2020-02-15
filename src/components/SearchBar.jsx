import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            suggestions: [
                'a', 'aa', 'aaa', 'b', 'bb', 'bbb', 'c', 'cc', 'ccc',
            ],
            loading: false,
            message: ''
        }
    }

    onInputChange = (e) => {
        const value = e.target.value;
        this.setState({
            query: value
        })
    };

    selectedSuggestion = (value) => {
        this.setState({
            query: value,
            suggestions: []
        })
    };

    renderSuggestions = () => {
        const { suggestions, query } = this.state;
        if (suggestions.length === 0 || query.length < 3) {
            return null;
        }
        return (
            <ul>{suggestions.map((suggestion) => <li onClick={() => this.selectedSuggestion(suggestion)}>{suggestion}</li>)}</ul>
        )
    };

    render() {
        const { query} = this.state;
        return (
            <div className="container">
                <img src="" alt=""/>
                <div className="search-bar">
                    <input type="text"
                           value={query}
                           onChange={this.onInputChange}
                    />
                {this.renderSuggestions()}
                </div>
                <button className="search-btn">Search</button>
            </div>
        )
    }
}

export default SearchBar;