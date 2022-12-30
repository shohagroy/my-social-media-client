import React from "react";
import DisplayProfilePicture from "../../Shared/DisplayProfilePicture/DisplayProfilePicture";
import UpdateCollege from "./UpdateCollege";
import UpdateDateofBirth from "./UpdateDateofBirth";
import UpdateLiveninCity from "./UpdateLiveinCity";
import UpdateMobile from "./UpdateMobile";
import UpdateSchool from "./UpdateSchool";
import UpdateWork from "./UpdateWork";

const UpdateProfile = () => {
  return (
    <section className="">
      <div className="max-w-[1200px] border mx-auto">
        <DisplayProfilePicture />

        <div>
          <div className="m-6">
            <h2 className="font-semibold text-2xl">Update Profile</h2>
            <UpdateSchool />
            <UpdateCollege />
            <UpdateWork />
            <UpdateLiveninCity />
            <UpdateMobile />
            <UpdateDateofBirth />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
