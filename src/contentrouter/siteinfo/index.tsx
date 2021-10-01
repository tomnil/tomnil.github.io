import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const SiteInfo = (): JSX.Element => {

    return <>
        <div className="siteinfo-headline">
            https://tomnil.github.io/
        </div>
        <div className="siteinfo-description">
            This site is my notebook for all kinds of technical problems and solutions I’ve come across during the years working with computers.<br />
            <br />
            I also write articles at <a href="https://tomasnilsson71.medium.com/">Medium</a> (large high-quality articles about various topics).<br />
            <br />
            I hope you will find some of the information here helpful.<br />
            <br />
            Enjoy :)
        </div>
    </>;
};

export default SiteInfo;