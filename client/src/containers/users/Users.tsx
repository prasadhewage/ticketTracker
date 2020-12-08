import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { SearchBar } from '../../components';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/users?search`)
        .then(res => {
            console.log(res.data)
            setUsers(res.data.tickets);
        })
    }, []);
    
    const handleSearch = (term: any) => {
        console.log(term);

        axios.get(`http://localhost:5000/users?search=${term}`)
        .then(res => {
            console.log(res.data)
            setUserId(term);
            setUsers(res.data.tickets);
        })
    }

    return (
        <div className="mt-10">
            <div className="flex mb-10 flex-col items-end">
                {/* <h2 className="flex-1 extrabold text-2xl">Search Userss</h2> */}
                <SearchBar placeHolder="Users" callback={(val: string) => handleSearch(val)} />
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
                                    Ticket
                                </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    users.map((User, key) => {
                                        const {organization: {name, details}, subject, submitter_id, assignee_id} = User;

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
                                                    {
                                                        (submitter_id == userId)?
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Submitted
                                                        </span>
                                                        :
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                            Assigned
                                                        </span>
                                                    }
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

export default Users;
