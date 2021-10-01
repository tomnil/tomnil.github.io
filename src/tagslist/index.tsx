import React from 'react';
import { Article, Tag } from '../types';
import './index.css';

const TagsList = (props: { Articles: Article[], ApplyFilter: (iTag: Tag | undefined) => void, IsFiltered: boolean }): JSX.Element => {

    let tags = props.Articles.map(a => a.Tags)
        .reduce((flat, tag) => flat.concat(tag))
        .sort((t1, t2) => t1.toLowerCase() > t2.toLowerCase() ? 1 : -1);

    // Distinct
    tags = tags.filter((tag, index, arr) => arr.indexOf(tag) === index);

    return <>
        <div className="tags-container">
            <div className="tags-list-container">
                {tags.map(t => <div className="tags-list-item" onClick={() => props.ApplyFilter(t)}>#{t}</div>)}
            </div>
            {props.IsFiltered
                ? <div className="tags-clear-filter" onClick={() => props.ApplyFilter(undefined)}>View all</div>
                : <></>
            }

        </div>

    </>;

};

export default TagsList;