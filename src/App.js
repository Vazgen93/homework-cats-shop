import React from "react";
import axios from "axios";

// COMPONENTS
import CardItem from "./components/card-item/CardItem.component";
import Loading from "./components/loading/Loading.component";
import SearchInput from "./components/search-input/SearchInput";

// STYLES
import "./app.scss";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            selectedCats:[],
            catsFromServer: [],
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        const response = axios.get("https://jsonplaceholder.typicode.com/users");

        response
            .then((result) => {
                const data = result.data;
                    this.setState({ catsFromServer: data, isLoading: false });
            })
            .catch((err) => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: "Something went wrong",
                        isLoading: false,
                    });
                }, 2000);
            });
    }

    handleChange = (event) => {
        //? INPUT VALUE
        const searchValue = event.target.value;

        //? SET INPUT VALUE TO STATE
        this.setState({ search: searchValue });
    };



    transferCatHandle = (id,type) => {
        const availableCats = [...this.state.catsFromServer];
        const selectedCats = [...this.state.selectedCats];

        if(type === 'available'){
            const availableCatIndex = availableCats.findIndex((item) => {
                return item.id === id;
            });
            const selectedUserItem = availableCats.splice(availableCatIndex, 1);
            selectedCats.push(selectedUserItem[0])
        }

        if(type === 'selected'){
            const selectedCatIndex = selectedCats.findIndex((item) => {
                return item.id === id;
            });
            const availableCatItem = selectedCats.splice(selectedCatIndex, 1);
            availableCats.push(availableCatItem[0])
        }

        this.setState({
            catsFromServer: availableCats,
            selectedCats:selectedCats
        });
    };


    render() {
        const { search,selectedCats,catsFromServer,isLoading,errorMessage } = this.state

        const mySearchInputValue = search.toLowerCase();

        const filteredCatsData = catsFromServer.filter((cat) => {
            const catLowerCaseName = cat.name.toLowerCase();
            return catLowerCaseName.includes(mySearchInputValue);
        });

        const filteredSelectedCats = selectedCats.filter((cat) => {
            const catLowerCaseName = cat.name.toLowerCase();
            return catLowerCaseName.includes(mySearchInputValue);
        });

        return (
            <div className="app">
                <div className="app__header">
                    <h1>Catty shop</h1>
                    <div className="app__search">
                        <SearchInput
                            handleChange={this.handleChange}
                            value={this.state.search}
                            className="app__search-input"
                            inputPlaceholder="Search cats"
                        />
                    </div>
                </div>

                <main className="app__main">
                    {/*AVAILABLE CATS*/}
                    <div className="app__main-available app__main-block">
                        <h2>Available cats</h2>
                        <ul className="app__main-list">
                            {isLoading && <div className="app__loading-container"><Loading /></div> }
                            {errorMessage && <div>{errorMessage}</div>}
                            {
                                filteredCatsData.map((cat) => {
                                    return (
                                        <CardItem
                                            key={('A'+cat.id)}
                                            cat={cat}
                                            transferCatHandle={this.transferCatHandle}
                                            cardType="available"
                                        />
                                    );
                                })}
                        </ul>
                    </div>
                    {/*SELECTED CATS*/}
                    <div className="app__main-selected app__main-block">
                        <h2>Selected cats <span>{selectedCats.length}</span></h2>
                        <ul className="app__main-list">
                            {isLoading && <div className="app__loading-container"><Loading /></div> }
                            {!!selectedCats.length &&
                            filteredSelectedCats.map((cat) => {
                                return (
                                    <CardItem
                                        key={('B'+cat.id)}
                                        cat={cat}
                                        transferCatHandle={this.transferCatHandle}
                                        cardType="selected"
                                    />
                                );
                            })}
                        </ul>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
