import React, {useState} from 'react'
import { Button } from '../';

interface ISearchBar {
    isLoading?: boolean,
    placeHolder: string,
    callback: Function;
};

const SearchBar = (props: ISearchBar) => {
    const {isLoading, callback, placeHolder} = props;
    
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="rounded-md shadow-sm">
            <input type="text" placeholder={placeHolder} className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}  />
            <Button text="Search" bgClass="bg-indigo-400" hoverBgClass="hover:bg-indigo-700" callBack={() => callback(searchTerm)} />
        </div>
    )
}

export default SearchBar;
