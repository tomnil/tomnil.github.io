import "./index.css";

import React from "react";


const About = (): JSX.Element => {

    return <div className="about-container">
        <div className="about-github">
            View On <a href="https://github.com/tomnil/" style={{ color: "black" }}>GitHub</a>
        </div>
        <div className="about-enjoy">
            <h3><a href="/about" style={{ color: "black" }}>Contact</a></h3>
        </div>
        <div className="about-version">
            v20211017
        </div>
    </div >;
};

export default About;