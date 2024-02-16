import React, { useState, useEffect } from "react";

const Rank = ({ user }) => {
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    const fetchEmoji = async () => {
      const promise = await fetch(
        `https://uhxjl05mua.execute-api.eu-north-1.amazonaws.com/prod/rank/?rank=${user.entries}`
      );

      const emoji = await promise.json();
      setEmoji(emoji.input);
    };

    fetchEmoji();
  }, [user.entries]);

  return (
    <>
      <div className="white f3">{`${user.name}, your current entry count is ...`}</div>
      <div className="white f1">{`${Number(user.entries)}`}</div>
      <div className="white f3">{`Rank Badge: ${emoji}`}</div>
    </>
  );
};

export default Rank;
