import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../Components/GobalAuthProvaider/GobalAuthProvaider";

const UpdateWork = () => {
  const { user } = useContext(AuthContex);
  const [viewProfile, setViewProfile] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/findUserProfile?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("weShare")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setViewProfile(data);
        setLoading(false);
      });
  }, [modalLoading, user]);

  const updateWorkNameHandelar = (e) => {
    e.preventDefault();
    setModalLoading(true);

    const workName = e.target.workName.value;
    const address = e.target.address.value;

    const updateWork = { name: workName, address };

    fetch(`http://localhost:5000/findUserWork?email=${user.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("weShare")}`,
      },
      body: JSON.stringify(updateWork),
    })
      .then((res) => res.json())
      .then((data) => {
        setModalLoading(false);
        setOpenModal(!openModal);
      });
  };

  if (loading) {
    return (
      <div className="w-[600px]">
        <div className="py-4 rounded  animate-pulse ">
          <div className="p-4 space-y-4 sm:px-8">
            <div className="w-full h-8 rounded bg-gray-400"></div>
            <div className="w-3/4 h-8 rounded bg-gray-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4">
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">
          <i class="fa-solid fa-briefcase my-3"></i> Your Work
        </p>
        <button
          onClick={() => setOpenModal(!openModal)}
          className="text-blue-500 text-xl font-semibold"
        >
          {" "}
          <i className="fa-sharp border border-blue-500 rounded-full p-1  mr-2 fa-solid fa-plus"></i>
          <span>Add Work </span>
        </button>
      </div>
      <div className="text-xl font-semibold text-gray-500">
        {loading === true ? (
          <div className="w-[600px]">
            <div className="py-4 rounded  animate-pulse ">
              <div className="p-4 space-y-4 sm:px-8">
                <div className="w-full h-8 rounded bg-gray-400"></div>
                <div className="w-3/4 h-8 rounded bg-gray-400"></div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {viewProfile?.work?.name ? (
              <div>
                <p>
                  Work Name:{" "}
                  <span className="font-bold text-black">
                    {viewProfile?.work?.name}
                  </span>
                </p>
                <p>
                  Address:{" "}
                  <span className="font-bold text-black">
                    {viewProfile?.work?.address}
                  </span>
                </p>
              </div>
            ) : (
              <div className="flex text-black font-bold text-2xl justify-center items-center py-12">
                <h2>Please Add Your Work!</h2>
              </div>
            )}
          </div>
        )}
      </div>

      <hr className="my-2" />

      {openModal && (
        <div className="absolute md:top-[480px] h-screen flex justify-center items-center top-0   left-0 w-full">
          <div className="flex justify-center items-center">
            <form
              onSubmit={(e) => updateWorkNameHandelar(e)}
              action=""
              className="border p-8 bg-white rounded-xl shadow-lg text-center w-full "
            >
              {!modalLoading ? (
                <div>
                  <div className="flex justify-end">
                    <p
                      onClick={() => setOpenModal(!openModal)}
                      className="cursor-pointer w-12 h-12 p-2 text-xl hover:text-red-600 hover:border-red-600 text-black border-2 border-black rounded-full"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </p>
                  </div>
                  <p className=" font-semibold text-2xl my-3">Your Work Name</p>
                  <input
                    type="text"
                    placeholder="Work Name"
                    name="workName"
                    defaultValue={viewProfile?.work.name}
                    required
                    className="border p-3 w-full rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    defaultValue={viewProfile?.work.address}
                    required
                    name="address"
                    className="border p-3 w-full my-3 rounded-md"
                  />
                  <button className="w-full py-3 rounded-md font-semibold hover:text-white bg-blue-200 hover:bg-blue-500">
                    Add Work
                  </button>
                </div>
              ) : (
                <div className="w-[600px]">
                  <div className="py-4 rounded  animate-pulse ">
                    <div className="p-4 space-y-4 sm:px-8">
                      <div className="w-full h-8 rounded bg-gray-400"></div>
                      <div className="w-3/4 h-8 rounded bg-gray-400"></div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateWork;
