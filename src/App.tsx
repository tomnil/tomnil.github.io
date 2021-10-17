import "./app.css";

import React from "react";
import { useHistory } from "react-router-dom";

import { Articles } from "./articledb";
import ContentRouter from "./contentrouter";
import Header from "./header";
import MouseTrail from "./mousetrail";
import TagsList from "./tagslist";
import { Tag } from "./types";
import VersionInfo from "./versioninfo";


function Website(): JSX.Element {

  const [articles, setArticles] = React.useState(Articles);
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [displayMode, setDisplayMode] = React.useState<"Grid" | "List">("List");

  const history = useHistory();

  function RedirectTo(iURL: string): void {
    if (history)
      history.push(iURL);
  }

  function ApplyFilter(iTag: Tag | undefined): void {
    if (iTag) {
      setArticles(Articles.filter(a => a.Tags.includes(iTag)));
      setIsFiltered(true);
    }
    else {
      setArticles(Articles);
      setIsFiltered(false);
    }
    RedirectTo("/");
  }

  return <>
    <MouseTrail />
    <Header CurrentMode={displayMode} SetDisplayMode={(iMode: "Grid" | "List") => setDisplayMode(iMode)} />
    <div className="main-container skinny-look">
      <div>
        <TagsList Articles={articles} ApplyFilter={ApplyFilter} IsFiltered={isFiltered} />
        <VersionInfo />
      </div>
      <div>
        <ContentRouter CurrentMode={displayMode} Articles={articles} ApplyFilter={ApplyFilter} RedirectTo={RedirectTo} />
      </div>
    </div>
  </>;
}



export default Website;
