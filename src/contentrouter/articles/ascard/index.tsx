import "./index.css";

import React from "react";

import Launch from "../../../media/launchb.png";
import { Article, Tag } from "../../../types";


function Card(props: { Article: Article, ApplyFilter: (iTag: Tag | undefined) => void, RedirectTo: (iURL: string) => void }): JSX.Element {

    const article = props.Article;

    const destination = `/mdviewer?date=${article.Date.toISOString().substring(0, 10)}&path=${article.URL}`;

    return <div style={{ opacity: 1, animation: `1s ease-out ${(Math.random() / 2).toFixed(2)}s 1 slideInFromLeft` }}>
        <div className="card-container" style={{ backgroundColor: `${article.Verified ? "inherit" : "yellow"}` }}>
            {article.Site === undefined
                ? <div className="card-headline" onClick={() => props.RedirectTo(destination)}>
                    <div>{article.Title}</div>
                    <div className="card-description">{article.Excerpt}</div>
                </div>
                : <div className="card-headline" >
                    <div><a href={article.URL}>{article.Title}</a><img src={Launch} height="10px" /></div>
                    <div className="card-description">{article.Excerpt}</div>
                </div>
            }
            <div className="card-bottom">
                <div className="card-tags">
                    {article.Tags.map(t => <div className="card-tag" onClick={() => props.ApplyFilter(t)}>#{t}</div>)}
                </div>
                <div className="card-date">
                    {article.Date.toISOString().substring(0, 10)}
                </div>
            </div>
        </div >
    </div>;

}

export default Card;
