import React from 'react';
import { Article, Tag } from '../../../types';
import './index.css';

function Card(props: { Article: Article, ApplyFilter: (iTag: Tag | undefined) => void, RedirectTo: (iURL: string) => void }): JSX.Element {

    const article = props.Article;

    const destination = `/mdviewer?date=${article.Date.toISOString().substring(0, 10)}&path=${article.URL}`;


    return <>
        <div className="color item">
            <div className="item-date skinny-hide">
                ∎ {article.Date.toISOString().substring(0, 10)}
            </div>
            <div className="item-headline" onClick={() => props.RedirectTo(destination)}>
                {article.Title}
            </div>
            <div className="item-tags-container">
                {article.Tags.map(t => <div className="item-tags" onClick={() => props.ApplyFilter(t)}>#{t}</div>)}
            </div>
        </div>

    </>;

}

export default Card;
