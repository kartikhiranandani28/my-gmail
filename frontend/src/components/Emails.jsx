import React, { useEffect, useState } from 'react'
import Email from './Email'
import useGetAllEmails from '../hooks/useGetAllEmails'
import { useSelector } from 'react-redux';


const Emails = () => {
  useGetAllEmails();
  const { emails, searchText, user } = useSelector(store => store.app);
  const [filterEmail, setFilterEmail] = useState(emails);

  useEffect(() => {
    const filteredEmail = emails.filter((email) => {
      const belongsToUser =
  email.to.toLowerCase() === user.email.toLowerCase() ||
  email.from.toLowerCase() === user.email.toLowerCase();

      
      const matchesSearch = email.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        email.to.toLowerCase().includes(searchText.toLowerCase()) ||
        email.message.toLowerCase().includes(searchText.toLowerCase());
      return belongsToUser && matchesSearch;
    });
    setFilterEmail(filteredEmail);
  }, [searchText, emails, user.email]);


  console.log("Filtered emails to render:", filterEmail);

  return (
    <div>
      {filterEmail && filterEmail.map(email => (
        <Email key={email._id} email={email} />
      ))}
    </div>
  );

}

export default Emails