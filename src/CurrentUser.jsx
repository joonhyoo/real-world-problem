import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import avatar from "./assets/circular-avatar.svg";

function CurrentUser({ users, userId }) {
  const [currUser, setCurrUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!userId) {
      console.log("no current user");
    } else {
      console.log(userId);
      setCurrUser(users.find((user) => String(user.id) === userId));
    }
    console.log(userId);
  }, [userId]);

  return (
    <div id="right-side" className="flex-1">
      {currUser ? (
        <div className="p-3">
          <button
            onClick={() => setSearchParams({ userId: null })}
            className="hover:cursor-pointer md:hidden"
          >
            back
          </button>
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
      ) : (
        <div className="hidden md:block w-full py-4 text-center">
          No Selected Contact
        </div>
      )}
    </div>
  );
}

export default CurrentUser;
