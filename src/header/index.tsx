import "./index.css";

import React from "react";
import { NavLink } from "react-router-dom";

import DisplayMode from "./displaymode";


const Header = (props: { CurrentMode: "List" | "Grid", SetDisplayMode: (mode: "List" | "Grid") => void }): JSX.Element => {

    return <>
        <div className="header-container">

            <div className="header-headline-container">
                <NavLink to="/" style={{ textDecoration: 'none', color: "white" }}>
                    <div className="header-headline">
                        Tocuments
                    </div>
                    <div className="header-subline">
                        It's a mess
                    </div>
                </NavLink>
            </div>
            <div className="header-displaybuttons-container">
                <DisplayMode CurrentMode={props.CurrentMode} SetDisplayMode={props.SetDisplayMode} />
            </div>
        </div>

    </>;

};

export default Header;
