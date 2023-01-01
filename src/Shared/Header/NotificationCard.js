import React from "react";
import Notification from "./Notification";

const NotificationCard = ({ notifications }) => {
  return (
    <div className=" p-4 border-2 rounded-xl border-gray-500 h-full w-full">
      <h2 className="text-xl p-3 bg-gray-100 mb-1 rounded-t-xl font-semibold text-center">
        All Notification
      </h2>
      <hr />
      <div className="h-full mt- bg-gray-50">
        {notifications.map((notification) => (
          <Notification notification={notification} key={notification._id} />
        ))}
      </div>
    </div>
  );
};

export default NotificationCard;
