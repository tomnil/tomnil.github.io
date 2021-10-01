import React from 'react';
import MarkDownViewer from './articles/markdownviewer';
import Cards from './articles/listarticles';
import queryString from 'query-string';
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { StaticContext } from 'react-router';
import { Article, Tag } from '../types';
import './index.css';
import SiteInfo from './siteinfo';
import ContactMe from './contactme';

function ContentRouter(props: { CurrentMode: "List" | "Grid", Articles: Article[], ApplyFilter: (iTag: Tag | undefined) => void, RedirectTo: (iURL: string) => void }): JSX.Element {

  return <div className="content-container paper-shadow">

    <Switch>

      { /* Show root of site */}

      <Route path="/" exact={true}>
        <SiteInfo />
        <Cards CurrentMode={props.CurrentMode} Articles={props.Articles} ApplyFilter={props.ApplyFilter} RedirectTo={props.RedirectTo} />
      </Route>


      { /* Markdown viewer */}
      <Route path="/mdviewer" render={(p: RouteComponentProps<{}, StaticContext, unknown>) => {
        const q = queryString.parse(p.location.search);
        const p1 = (q.path as string)?.replace("/articles", "/_");
        return p1 ? <MarkDownViewer path={p1} /> : <h1>No path</h1>;
      }} />


      { /* Backwards compability with old site */}
      <Route path="/articles" render={(p: RouteComponentProps<{}, StaticContext, unknown>) => {
        return <MarkDownViewer path={`${p.location.pathname.replace("/articles", "/_")}.md`} />;
      }} />


      { /* 404 handler */}
      <Route path="/about" >
        <ContactMe />
      </Route>


      { /* 404 handler */}
      <Route path="*" >
        <h1>404 :(</h1>
      </Route>

    </Switch>
  </div>;

}



export default ContentRouter;
