import React, { useState } from "react";
import { Link } from "react-router-dom";
import DisplayProfilePicture from "../../Shared/DisplayProfilePicture/DisplayProfilePicture";
import UpdateCollege from "./UpdateCollege";
import UpdateDateofBirth from "./UpdateDateofBirth";
import UpdateLiveninCity from "./UpdateLiveinCity";
import UpdateMobile from "./UpdateMobile";
import UpdateSchool from "./UpdateSchool";
import UpdateWork from "./UpdateWork";
import { Helmet } from "react-helmet";

const UpdateProfile = () => {
  const [traimlineId, setTraimlineId] = useState("");
  return (
    <section className="">
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <div className="max-w-[1200px] border mx-auto">
        <DisplayProfilePicture />

        <div>
          <div className="m-6">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-2xl">Update Profile</h2>
              <Link to={`/profile/view?id=${traimlineId}`}>
                <button className="bg-blue-700 py-2 px-5 font-semibold rounded-md text-white">
                  View as Tramline
                </button>
              </Link>
            </div>
            <UpdateSchool setTraimlineId={setTraimlineId} />
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
