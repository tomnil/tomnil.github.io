import "./index.css";

import React from "react";

import Launch from "../../../media/launchb.png";
import { Article, Tag } from "../../../types";


function Card(props: { Article: Article, ApplyFilter: (iTag: Tag | undefined) => void, RedirectTo: (iURL: string) => void }): JSX.Element {

    const article = props.Article;

    return <>
        <div className="color item">
            <div className="item-date skinny-hide">
                ∎ {article.Date.toISOString().substring(0, 10)}
            </div>
            {article.Site === undefined
                ? <div className="item-headline" onClick={() => props.RedirectTo(`/mdviewer?path=${article.URL}`)}>
                    {article.Title}
                </div>
                : <div className="item-headline">
                    <a href={article.URL}>{article.Title}</a><img src={Launch} height="10px" />
                </div>
            }
            <div className="item-tags-container">
                {article.Tags.map(t => <div className="item-tags" onClick={() => props.ApplyFilter(t)}>#{t}</div>)}
            </div>
        </div>

    </>;
}

export default Card;
