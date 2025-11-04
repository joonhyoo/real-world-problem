import { useEffect, useState } from "react";
import ContactList from "./ContactList.jsx";
import CurrentUser from "./CurrentUser.jsx";
import { useSearchParams } from "react-router-dom";

function Contact() {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => {
        const sortedUsers = users.sort((a, b) => {
          const nameA = a.name.split(" ");
          const nameB = b.name.split(" ");
          return nameA[nameA.length - 1].localeCompare(nameB[nameB.length - 1]);
        });
        setUsers(sortedUsers);
      });
  }, []);
  return (
    <div className="flex h-full">
      <ContactList users={users} userId={userId} />
      <CurrentUser users={users} userId={userId} />
    </div>
  );
}

export default Contact;
