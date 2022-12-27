import React from "react";
import CreateNewFeed from "../../Components/CreateNewFeed/CreateNewFeed";
import FeedsCard from "../../Shared/FeedsCard/FeedsCard";

const Feed = () => {
  return (
    <section className="mx-2">
      <div>
        <div>
          <CreateNewFeed />
        </div>
        <FeedsCard />
        <FeedsCard />
        <FeedsCard />
        <FeedsCard />
      </div>
    </section>
  );
};

export default Feed;
