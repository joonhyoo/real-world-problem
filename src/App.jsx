import { useState, useEffect } from "react";
import avatar from "./assets/circular-avatar.svg";
import Fuse from "fuse.js";

function App() {
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        setCurrUser(sortedUsers[0]);
        setResults(sortedUsers);
      });
  }, []);

  const fuseOptions = {
    isCaseSensitive: false,
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    keys: ["name"],
  };

  const fuse = new Fuse(users, fuseOptions);

  const handleSearchChange = (e) => {
    const { value } = event.target;
    setSearchTerm(value);
    if (value.length === 0) {
      setResults(users);
    } else {
      const res = fuse.search(value);
      const items = res.map((r) => r.item);
      setResults(items);
    }
  };

  const updateCurrUser = (id) => {
    const foundUser = users.find((user) => user.id === id);
    setCurrUser(foundUser);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div
        id="left-side"
        className="flex flex-col items-start border-r-2 border-gray-200 md:w-sm overflow-hidden"
      >
        <div className="w-full py-4">
          <h2 className="text-lg text-center font-medium">Contacts</h2>
        </div>
        <div className="w-full p-2 bg-gray-300">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-2 py-1 text-sm placeholder-gray-500 bg-white rounded-md"
          />
        </div>
        {searchTerm.length > 0 && (
          <p className="text-gray-600 text-sm px-4 py-2">Top Name Matches</p>
        )}
        <div className="overflow-y-scroll">
          {results.map((user) => (
            <button
              key={user.id}
              onClick={() => updateCurrUser(user.id)}
              className={
                "cursor-pointer hover:brightness-90 w-full text-left bg-white duration-150 ease-in-out truncate text-ellipsis" +
                (currUser.id === user.id &&
                  " text-blue-500 font-semibold duration-300 ease-in-out")
              }
            >
              <div className="py-2 mx-4 border-b border-gray-200">
                {user.name}
              </div>
            </button>
          ))}
          <div className="text-center w-full text-sm font-medium py-4">
            {users.length} Contacts
          </div>
        </div>
      </div>
      <div id="right-side" className="flex-1 hidden md:block">
        {currUser && (
          <div className="p-3">
            <div className="flex flex-col items-center gap-4">
              <img src={avatar} className="w-30 h-20" />
              <h2 className="text-3xl">{currUser.name}</h2>
            </div>
            <div className="py-1 border-b-2 border-gray-200">
              <h2 className="text-sm">Phone Number</h2>
              {currUser.phone}
            </div>
            <div className="py-1 border-b-2 border-gray-200">
              <h2 className="text-sm">Email Address</h2>
              {currUser.email}
            </div>
            <div className="py-1 border-b-2 border-gray-200">
              <h2 className="text-sm">Home</h2>
              {[
                currUser.address.street,
                currUser.address.suite,
                currUser.address.city,
                currUser.address.zipcode,
              ].map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
