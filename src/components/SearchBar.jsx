import React, {Component} from 'react';

class SearchBar extends Component {
    state =  {
        query: '',
        suggestions: [
            'a', 'aa', 'aaa', 'b', 'bb', 'bbb', 'c', 'cc', 'ccc',
        ],
        loading: false,
        message: ''
    };

    render() {
        return (
            <div className="container">
                <img src="" alt=""/>
                <div className="search-bar">
                        saasaf
                </div>
                <button className="search-btn">Search</button>
            </div>
        )
    }
}

export default SearchBar;