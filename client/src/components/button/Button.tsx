import React from 'react'

interface IButton {
    text: string;
    bgClass: string;
    hoverBgClass: string;
    callBack?: Function;
};

const Button = (props: IButton) => {
    const {text, bgClass, hoverBgClass, callBack} = props;

    return (
        <button className={`ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${bgClass} ${hoverBgClass} bg-indigo-600 hover:bg-indigo-700`} onClick={() => (callBack)? callBack() : null}>
            {text}
        </button>
    )
}

export default Button;