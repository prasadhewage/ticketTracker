import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from 'react-router-dom';
import { Button, MenuItem } from '../';
import {navigation} from '../../constants';

const Header = (props: any) => {
    const { loginWithRedirect, user, logout } = useAuth0();
    const [loggedInUser, setLoggedInUser] = useState("");
    let history = useHistory();

    useEffect(() => {
        if(user !== undefined) {
            localStorage.setItem('timeTrackerUser', JSON.stringify(user));
            
            history.push('/organization');
            setLoggedInUser(user);
        }
    }, [user]);

    useEffect(() => {
        if (localStorage.getItem('timeTrackerUser')) {
            let userData = localStorage.getItem('timeTrackerUser');
            
            if(userData) {
                setLoggedInUser(JSON.parse(userData));
            }
        } 
        
    }, []);

    const handleLogOut = () => {
        localStorage.setItem('timeTrackerUser', "");
        setLoggedInUser("");
        logout();
    }

    return (
        <>
            <div className="relative bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <span className="font-extrabold m-3 uppercase inline-flex hover:text-pink-700 transition-all duration-500">
                                Ticket Tracker
                            </span>
                        </div>
                        {
                            (loggedInUser)?
                            navigation.map((navItem, key) =>{
                                return (
                                    <MenuItem text={navItem.text} link={navItem.link} textClrClass="text-gray-500" textHoverClass="hover:text-gray-900" key={key} />
                                )
                            })
                            :
                            null
                        }
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            {
                                (!loggedInUser)?
                                <Button text="Log in" bgClass="bg-indigo-600" hoverBgClass="hover:bg-indigo-700" callBack={() => loginWithRedirect()} />
                                :
                                <Button text="Log Out" bgClass="bg-indigo-600" hoverBgClass="hover:bg-indigo-700" callBack={() => handleLogOut()}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;