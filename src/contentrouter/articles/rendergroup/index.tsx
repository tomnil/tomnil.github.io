import "./index.css";

import React from "react";

import { Article, Tag } from "../../../types";
import AsCard from "../ascard";
import AsItem from "../asitem";


function RenderGroup(props: { CurrentMode: "List" | "Grid", Articles: Article[], ApplyFilter: (iTag: Tag | undefined) => void, RedirectTo: (iURL: string) => void }): JSX.Element {

  props.Articles.sort((a, b) => a.Date > b.Date ? -1 : 1);

  if (props.CurrentMode === "List")

    return <>
      <div className="rendergroup-container">
        {props.Articles.map(article => <AsItem key={`I${article.Title}`} Article={article} ApplyFilter={props.ApplyFilter} RedirectTo={props.RedirectTo} />)}
      </div>
    </>;

  else

    return <>
      <div className="rendergroup-container-wrap">
        {props.Articles.map(article => <AsCard key={`C${article.Title}`} Article={article} ApplyFilter={props.ApplyFilter} RedirectTo={props.RedirectTo} />)}
      </div>
    </>;
}



export default RenderGroup;
