import React from "react";

const ContactMe = (): JSX.Element => {

  return <>

    It's nice you want to contact me 😃
    I'm available on multiple channels, use the one you prefer.

    <ul>
      <li><a href="https://github.com/tomnil/" >GitHub</a></li>
      <li><a href="https://www.linkedin.com/in/tomnil/" >LinkedIn</a></li>
      <li>Email - use the form below</li>
    </ul>

    <form action="https://formspree.io/xpzqjwwn" method="POST">
      <label>
        Your email<br />
        <input type="text" name="_replyto" /><br /><br />
      </label>
      <label>
        Your message<br />
        <textarea name="message" rows={10} cols={80}></textarea><br />
      </label>

      <button type="submit">Send</button>
    </form>
  </>;

};

export default ContactMe;
