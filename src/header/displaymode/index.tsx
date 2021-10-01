import React from 'react';
import Grid from './grid.png';
import List from './list.png';
import './index.css';



const DisplayMode = (props: { CurrentMode: "List" | "Grid", SetDisplayMode: (mode: "List" | "Grid") => void }): JSX.Element => {

    return <>
        <div className="displaymode-container">
            <div className="displaymode-container-go-absolute">
                <img src={Grid} />
                <img src={List} />
            </div>
            <div className={`displaymode-left-box ${props.CurrentMode === "Grid" ? "displaymode-go-visible" : "displaymode-go-transparent"}`} onClick={() => props.SetDisplayMode("Grid")} />
            <div className={`displaymode-right-box ${props.CurrentMode === "List" ? "displaymode-go-visible" : "displaymode-go-transparent"}`} onClick={() => props.SetDisplayMode("List")} />
        </div>
    </>;

};

export default DisplayMode;
