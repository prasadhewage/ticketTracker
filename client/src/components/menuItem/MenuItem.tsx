import React from 'react'
import { Link } from "react-router-dom";

interface IMenuItem {
    text: string;
    link: string;
    textClrClass: string;
    textHoverClass: string;
};

const MenuItem = (props: IMenuItem) => {
    const {text, link, textClrClass, textHoverClass} = props;

    return (
        <Link to={link} className={`text-base font-medium ${textClrClass} ${textHoverClass} text-gray-500 hover:text-gray-900`}>
            {text}
        </Link>
    )
}

export default MenuItem;
