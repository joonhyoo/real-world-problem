import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Fuse from "fuse.js";

function ContactList({ users, userId }) {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setResults(users);
  }, [users]);

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

  return (
    <div
      id="left-side"
      className={
        "md:flex md:flex-col items-start border-r-2 border-gray-200 md:w-sm overflow-hidden" +
        (userId !== "null" ? " hidden" : "")
      }
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
            onClick={() => setSearchParams({ userId: user.id })}
            className={
              "cursor-pointer hover:brightness-90 w-full text-left bg-white duration-150 ease-in-out truncate text-ellipsis"
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
  );
}

export default ContactList;
