import React, { useContext } from "react";
import CreateNewFeed from "../../Components/CreateNewFeed/CreateNewFeed";
import FeedsCard from "../../Shared/FeedsCard/FeedsCard";
import { useQuery } from "@tanstack/react-query";
import { AuthContex } from "../../Components/GobalAuthProvaider/GobalAuthProvaider";
import Skeleton from "../../Shared/Loaders/Skeleton";
import { Helmet } from "react-helmet";

const Feed = () => {
  // const [feedData, setFeedData] = useState([]);
  const { user, logOut } = useContext(AuthContex);
  const { data: feedsData = [], isLoading } = useQuery({
    queryKey: ["feedsData"],
    queryFn: async () => {
      const res = await fetch(
        `https://my-social-media-server.vercel.app/allFeedsData?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("weShare")}`,
          },
        }
      );
      const data = await res.json();
      if (data.massege === "unauthorized access") {
        return logOut();
      }
      return data;
    },
    refetchInterval: 1000,
  });

  if (isLoading) {
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    );
  }

  const { feeds, comments } = feedsData;

  return (
    <section className="mx-2">
      <Helmet>
        <title>WeShare!</title>
      </Helmet>
      <div>
        <div>
          <CreateNewFeed />
        </div>
        {feeds.map((data) => (
          <FeedsCard
            key={data._id}
            comments={comments}
            postId={data._id}
            post={data}
          />
        ))}
      </div>
    </section>
  );
};

export default Feed;
