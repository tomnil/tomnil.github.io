import "./index.css";

import React from "react";

import Launch from "../../media/launchb.png";
import MediumLogo from "../../media/medium_logo.png";


const SiteInfo = (): JSX.Element => {

    return <>
        <div className="siteinfo-headline">
            https://tomnil.github.io/
        </div>
        <div className="siteinfo-description">
            This site is my notebook for all kinds of technical problems and solutions I’ve come across during the years working with computers.<br />
            <br />
            I also write in-depth articles at <a href="https://tomasnilsson71.medium.com/"><img src={MediumLogo} height="13px" /></a> (see <img src={Launch} height="13px" /> below).<br />
            <br />
            I hope you will find some of the information here helpful.<br />
            <br />
            Enjoy :)
        </div>
    </>;
};

export default SiteInfo;