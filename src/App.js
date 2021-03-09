import React from "react";
import axios from "axios";

// COMPONENTS
import CardItem from "./components/card-item/CardItem.component";
import Loading from "./components/loading/Loading.component";
import SearchInput from "./components/search-input/SearchInput";

// STYLES
import "./app.scss";
import Alert from "./components/alert/Alert.component";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            selectedCats:[],
            catsFromServer: [],
            alert:{id:'',active:false,value:''}
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

    alertDisable = () => {
        this.setState({alert: {active:false,title:''}})
    }

    deleteCatHandle = (id) => {
        const cats = [...this.state.selectedCats];
        const selectedUserIndex = this.state.selectedCats.findIndex((item, idx) => {
            return item.id === id;
        });
        console.log(selectedUserIndex);
        cats.splice(selectedUserIndex, 1);
        console.log(cats);
        this.setState({ selectedCats: cats });
    };

    addSelectedCat = (id) => {
        const cats = [...this.state.selectedCats];
        console.log('cats',cats)
        const selectedUserItem = this.state.catsFromServer.find((item) => {
            return item.id === id;
        });
        let absentCat = true
        if(cats.length >= 1){
            cats.map((item)=>{
                if (item.id === selectedUserItem.id) {
                    absentCat = false
                }
            })
        }
        if(absentCat){
            cats.push(selectedUserItem)
            this.setState({selectedCats:cats})
        }else{
            this.setState({alert: {
                    id:selectedUserItem.id,
                    active:true,
                    title:selectedUserItem.name
            }})
        }
    }

    render() {
        const { search,selectedCats,catsFromServer,isLoading,errorMessage,alert } = this.state

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
                {
                    alert.active && <Alert title={alert.title} alertDisable={this.alertDisable}/>
                }

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
                                            addSelectedCat={this.addSelectedCat}
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
                                        deleteCatHandle={this.deleteCatHandle}
                                        buttonDelete={true}
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
