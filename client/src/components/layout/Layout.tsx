import React from 'react'
import {Header} from '../';

const Layout = (props: any) => {
    return (
        <>
            <Header />
            <div className="container mx-auto">
                {props.children}
            </div>
        </>
    )
}

export default Layout;