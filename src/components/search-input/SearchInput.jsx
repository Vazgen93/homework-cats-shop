import React, {Component} from 'react'
class SearchInput extends Component{

    render(){
        const {handleChange,value,className,inputPlaceholder} = this.props
        return (
            <input
                onChange={(event) => handleChange(event)}
                value={value}
                className={className}
                type="text"
                name="search"
                placeholder={inputPlaceholder}
            />
        )
    }
}

export default SearchInput