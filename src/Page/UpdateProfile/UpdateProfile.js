import React from "react";
import DisplayProfilePicture from "../../Shared/DisplayProfilePicture/DisplayProfilePicture";
import Navigation from "../../Shared/Header/Navigation";
import UpdateSchool from "./UpdateSchool";

const UpdateProfile = () => {
  return (
    <section className="">
      <Navigation />
      <div className="max-w-[1200px] border mx-auto">
        <DisplayProfilePicture />

        <div>
          <div className="m-6">
            <h2 className="font-semibold text-2xl">Update Profile</h2>
            <UpdateSchool />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
