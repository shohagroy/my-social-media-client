import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../Components/GobalAuthProvaider/GobalAuthProvaider";

const UpdateMobile = () => {
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

  const updateMobileNumberHandelar = (e) => {
    e.preventDefault();
    setModalLoading(true);

    const mobile = e.target.mobile.value;

    const updateMobile = { number: mobile };

    fetch(`http://localhost:5000/findUserMobile?email=${user.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("weShare")}`,
      },
      body: JSON.stringify(updateMobile),
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
          <i class="fa-solid fa-phone my-3"></i> Your Mobile/Phone
        </p>
        <button
          onClick={() => setOpenModal(!openModal)}
          className="text-blue-500 text-xl font-semibold"
        >
          {" "}
          <i className="fa-sharp border border-blue-500 rounded-full p-1  mr-2 fa-solid fa-plus"></i>
          <span>Add New Mobile/Phone</span>
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
            {viewProfile?.mobile?.number ? (
              <div>
                <p>
                  Mobile Number:{" "}
                  <span className="font-bold text-black">
                    {viewProfile?.mobile?.number}
                  </span>
                </p>
              </div>
            ) : (
              <div className="flex text-black font-bold text-2xl justify-center items-center py-12">
                <h2>Please Add Your Mobile/Phone!</h2>
              </div>
            )}
          </div>
        )}
      </div>

      <hr className="my-2" />

      {openModal && (
        <div className="absolute md:top-[480px] flex justify-center items-center top-0  h-full left-0 w-full">
          <div className="flex justify-center items-center">
            <form
              onSubmit={(e) => updateMobileNumberHandelar(e)}
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
                  <p className=" font-semibold text-2xl my-3">
                    Your Mobile Number
                  </p>
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    name="mobile"
                    required
                    className="border my-3 p-3 w-full rounded-md"
                  />
                  <button className="w-full py-3 rounded-md font-semibold hover:text-white bg-blue-200 hover:bg-blue-500">
                    Add Mobile Number
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

export default UpdateMobile;
