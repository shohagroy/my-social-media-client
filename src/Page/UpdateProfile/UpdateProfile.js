import React from "react";
import DisplayProfilePicture from "../../Shared/DisplayProfilePicture/DisplayProfilePicture";

const UpdateProfile = () => {
  return (
    <section className="max-w-[1200px] border mx-auto">
      <DisplayProfilePicture />

      <div>
        <div className="m-6">
          <h2 className="font-semibold text-2xl">Update Profile</h2>
          <div className="my-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">
                <i className="fa-solid my-3 fa-building-columns"></i> Your
                School
              </p>
              <button className="text-blue-500 text-xl font-semibold">
                {" "}
                <i className="fa-sharp border border-blue-500 rounded-full p-1  mr-2 fa-solid fa-plus"></i>
                <span>Add High School</span>
              </button>
            </div>
            <div className="text-xl font-semibold text-gray-500">
              <p>School Name: Affun ullah High School</p>
              <p>Achool Address: Rangpur, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
