import  {type FC, Fragment } from 'react';
import ContactProfiles from '../contactProfiles';
import ContactRequests from '../contactRequests';

const ContactProfileEntry: FC = () => {
  return (
    <Fragment>
      <ContactProfiles />
      <ContactRequests />
    </Fragment>
  )
}

export default ContactProfileEntry;