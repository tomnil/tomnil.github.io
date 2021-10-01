import React from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';
import path from 'path';
import remarkGfm from 'remark-gfm';

function ViewMarkdown(props: { path: string }): JSX.Element {

  const [markdown, setmarkdown] = React.useState<string>("");
  const [fetchDetails, setFetchDetails] = React.useState<{ name: string, path: string } | undefined>(undefined);

  // *****************************************
  // Use windows.location.origin to calculate document URL
  // *****************************************

  React.useEffect(() => {
    const rootPath = window.location.origin;  // "http?://servername:port/"
    setFetchDetails({
      path: `${rootPath}${path.dirname(props.path)}`,
      name: path.basename(props.path)
    });
  }, [props.path]);

  // *****************************************
  // Fetch the markdown document
  // *****************************************

  React.useEffect(() => {

    if (fetchDetails) {
      const fullPath = `${fetchDetails.path}/${fetchDetails.name}`;
      fetch(fullPath)
        .then(async response => {
          const text = await response.text();
          if (!text.includes("This HTML file is a template."))
            setmarkdown(text);
          else
            setmarkdown(`### Path not found.\r\n\r\n${fullPath}`);
        })
        .catch(e => {
          setmarkdown(`### Error - Path not found.\r\n\r\n${fullPath}\r\n\r\n${e}`);
        });
    }
  }, [fetchDetails]);



  if (!markdown)
    return <>Loading..</>;

  // Render

  return <>
    <div className="markdown-container">
      {fetchDetails
        ?
        <>
          {/* {`${fetchDetails.path}/${fetchDetails.name}`} */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={markdown}
            transformImageUri={(uri) => { return uri.startsWith("http") ? uri : `${fetchDetails.path}/${uri}`; }}
            transformLinkUri={(uri) => { return uri.startsWith("http") ? uri : `${fetchDetails.path}/${uri}`; }}
          />
        </>
        : <></>
      }
    </div>
  </>;
}

export default ViewMarkdown;
