import "./index.css";

import React from "react";

import { Article, Tag } from "../../../types";
import RenderGroup from "../rendergroup";


function ListArticles(props: { CurrentMode: "List" | "Grid", Articles: Article[], ApplyFilter: (iTag: Tag | undefined) => void, RedirectTo: (iURL: string) => void }): JSX.Element {

    let years = props.Articles.map(a => a.Date)
        .map(d => d.getFullYear())
        .sort();

    // Distinct
    years = years.filter((age, index, arr) => arr.indexOf(age) === index);

    years.reverse();

    return <>

        <h1 className="listarticles-super-headline">Article List</h1>
        <div className="listarticles-container" >
            {
                years.map(year => <>
                    <div className="listarticles-year">{year}</div>
                    <RenderGroup
                        CurrentMode={props.CurrentMode}
                        Articles={props.Articles.filter(a => a.Date.getFullYear() === year)}
                        ApplyFilter={props.ApplyFilter}
                        RedirectTo={props.RedirectTo}
                    />
                </>
                )
            }
        </div>

    </>;
}



export default ListArticles;
