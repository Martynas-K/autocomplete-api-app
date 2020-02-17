import React, {Component} from 'react';
import SearchBar from "./SearchBar";

class HomePage extends Component {
    render() {
        return (
            <div className="home">
                <div className="home__container">
                    <SearchBar></SearchBar>
                </div>
            </div>
        )
    }
}
export default HomePage;