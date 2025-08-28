import type { FC } from 'react';
import ContactProfiles from '../contactProfiles';
import ContactRequests from '../contactRequests';

const ContactProfileEntry: FC = () => {
  return (
    <>
      <ContactProfiles />
      <ContactRequests />
    </>
  )
}

export default ContactProfileEntry;