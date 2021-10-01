import React from 'react';
import './app.css';
import Header from './header';
import ContentRouter from './contentrouter';
import TagsList from './tagslist';
import VersionInfo from './versioninfo';
import { Articles } from './articledb';
import { Tag } from './types';
import { useHistory } from 'react-router-dom';
import DisplayMode from './header/displaymode';

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
