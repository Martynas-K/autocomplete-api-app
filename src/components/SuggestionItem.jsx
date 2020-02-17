import React, {Component} from 'react';

class SuggestionItem extends Component {
    getYearFromFullDate = (date) => new Date(date).getFullYear();

    render() {
        const {suggestions} = this.props;
        return (
            <div className="dropdown">
                <ul className="dropdown__list">{suggestions.map((suggestion) =>
                    <li className="dropdown__item"
                        key={suggestion.id}
                        onClick={() => this.props.selectedSuggestion(suggestion.original_title)}>
                        <p className="dropdown__title">{suggestion.original_title}</p>
                        <p className="dropdown__description">{suggestion.vote_average} Rating, {this.getYearFromFullDate(suggestion.release_date)}</p>
                    </li>)}
                </ul>
            </div>
        )
    }
}
export default SuggestionItem;