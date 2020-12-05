// /* global chrome */
import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import FridayLogo from '../assets/img/friday-logo.png';
import { Link } from 'react-router-dom';

const PrivacyPolicy = (props) => {
  return (
    <div>
      <div className={`hide-custom-flex font-weight-bold smart-scroll bg-transparent justify-content-between align-items-center p-2 text-secondary`}>
        <Link to="/">
          <div className="d-flex justify-content-center align-items-center">
            <img src={FridayLogo} className="logo" alt="logo" />
            <span className="p-2 font-weight-bold text-uppercase hide-custom text-secondary">friday.social</span>
          </div>
        </Link>
      </div>
      <div className="container">
        <Jumbotron className="dark d-flex justify-content-center">
          <h2 className="text-uppercase">Privacy Policy</h2>
        </Jumbotron>
        <section className="mb-5">
          <p>The terms "We" / "Us" / "Our"/ “Company” individually and collectively refer to <strong>FRIDAY</strong> and the terms "You" /"Your" / "Yourself" refer to the <strong>Users</strong>.</p>
          <p>Please read this Privacy Policy carefully by using Friday, you indicate that you understand,agree and consent to this Privacy Policy.</p>
          <p>By providing us your Information or by making use of the facilities provided by the app, You hereby consent to the collection, storage, processing and transfer of any or all of Your Personal Information and Non-Personal Information by us as specified under this Privacy Policy. You further agree that such collection, use, storage and transfer of Your Information shall not cause any loss or wrongful gain to you or any other person.</p>
        </section>
        <section className="mb-5">
          <h4 className="text-uppercase">User Information</h4>
          <p>To avail certain services on our web app, users are required to provide certain information for the registration process namely: -</p>
          <ul>
            <li>Your Name</li>
            <li>Email Address</li>
            <li>Gender</li>
            <li>Age</li>
            <li>Phone Number</li>
            <li>Pincode / Country</li>
            <li>Credit Card or Debit Card Details</li>
            <li>Password etc., and / or your interests, and non-personal information viz. modification of storage and the like.</li>
            <li>Information regarding usage of the web app like movies watched etc.</li>
          </ul>
          <p>The Information as supplied by the users enables us to improve our product and provide you the most user-friendly experience. All required information is service dependent and we may use the above said user information to, maintain, protect, and improve its services (including advertising services) and for developing new services.Such information will not be considered as sensitive if it is freely available and accessible in the public domain or is furnished under the Right to Information Act, 2005 or any other law for the time being in force.</p>
        </section>
        <section className="mb-5">
          <h4 className="text-uppercase">Cookies</h4>
          <p>To improve the responsiveness of the app for our users, we may use "cookies", or similar electronic tools to collect information to assign each visitor a unique, random number as a User Identification (User ID) to understand the user's individual interests using the Identified Computer. Unless you voluntarily identify yourself (through registration, for example), we will have no way of knowing who you are, even if we assign a cookie to your computer. The only personal information a cookie can contain is information you supply. A cookie cannot read data off your hard drive. Our advertisers may also assign their own cookies to your browser (if you click on their ads), a process that we do not control.</p>
          <p>Our web servers automatically collect limited information about your computer's connection to the Internet, including your IP address, when you visit our site. (Your IP address is a number that lets computers attached to the Internet know where to send you data -- such as the web pages you view.) Your IP address does not identify you personally. We use this information to deliver our web pages to you upon request, to tailor our site to the interests of our users, to measure traffic within our site and let advertisers know the geographic locations from where our visitors come.</p>
        </section>
        <section className="mb-5">
          <h4 className="text-uppercase">Links to the other sites</h4>
          <p>Our policy discloses the privacy practices for our own web site only. Our app may provide links to  other websites/mobile apps also that are beyond our control. We shall in no way be responsible for your use of such sites.</p>
        </section>
        <section className="mb-5">
          <h4 className="text-uppercase">Information Sharing</h4>
          <p>We share the sensitive personal information to any third party without obtaining the prior consent of the user only when it is requested or required by law or by any court or governmental agency or authority to disclose, for the purpose of verification of identity, or for the prevention, detection, investigation including cyber incidents, or for prosecution and punishment of offense. These disclosures are made in good faith and belief that such disclosure is reasonably necessary for enforcing these Terms; for complying with the applicable laws and regulations.</p>
        </section>
        <section className="mb-5">
          <h4 className="text-uppercase">Information Security</h4>
          <p>We take appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure or destruction of data. These include internal reviews of our data collection, storage and processing practices and security measures, including appropriate encryption and physical security measures to guard against unauthorized access to systems where we store personal data.</p>
          <p>All information gathered on our Mobile app is securely stored within our controlled database. The database is stored on servers secured behind a firewall; access to the servers is password-protected and is strictly limited. However, as effective as our security measures are, no security system is impenetrable. We cannot guarantee the security of our database, nor can we guarantee that information you supply will not be intercepted while being transmitted to us over the Internet. And, of course, any information you include in a posting to the discussion areas is available to anyone with Internet access.</p>
          <p>However the internet is an ever evolving medium. We may change our Privacy Policy from time to time to incorporate necessary future changes. Of course, our use of any information we gather will always be consistent with the policy under which the information was collected, regardless of what the new policy may be.</p>
        </section>
        <footer className="d-flex flex-column my-3">
          <b>Jagrit Surisetti</b>
          <span>Co-Founder</span>
          <i>FRIDAY</i>
        </footer>
      </div>
    </div>
  );
}

export default PrivacyPolicy;