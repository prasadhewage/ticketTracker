import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { SearchBar } from '../../components';

const Organization = () => {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/organizations?search`)
        .then(res => {
            console.log(res.data)
            setOrganizations(res.data.tickets);
        })
    }, []);
    
    const handleSearch = (term: any) => {
        console.log(term);

        axios.get(`http://localhost:5000/organizations?search=${term}`)
        .then(res => {
            console.log(res.data)
            setOrganizations(res.data.tickets);
        })
    }

    return (
        <div className="mt-10">
            <div className="flex mb-10 flex-col items-end">
                {/* <h2 className="flex-1 extrabold text-2xl">Search Organizations</h2> */}
                <SearchBar placeHolder="Organization" callback={(val: string) => handleSearch(val)} />
            </div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Organization
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ticket Subject
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User Name
                                </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    organizations.map((organization, key) => {
                                        const {organization: {name, details}, userName, subject} = organization;

                                        return (
                                            <tr key={key}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {details}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{subject}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {userName}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Organization;
