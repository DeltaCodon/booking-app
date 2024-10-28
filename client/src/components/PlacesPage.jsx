import React, { useState } from "react";
import plusIcon from "/plusIcon.svg";
import uploadIcon from "/uploadIcon.svg";
import { Link, useParams } from "react-router-dom";
import PerkCards from "./PerkCards";
import axios from "axios";

function PlacesPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [CheckIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const checkDetails = [
    {
      name: "Check-in time",
      path: "16:00",
      inputType: "text",
      state: CheckIn,
      setState: setCheckIn,
    },
    {
      name: "Check-out time",
      path: "10:00",
      inputType: "text",
      state: checkOut,
      setState: setCheckOut,
    },
    {
      name: "Max guest(s)",
      path: "6",
      inputType: "number",
      state: maxGuests,
      setState: setMaxGuests,
    },
  ];

  const { action } = useParams();

  function iHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function iDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {iHeader(header)}
        {iDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(event) {
    event.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    const { data } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  // .then method instead of making the function async
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex bg-themeBlue py-2 px-6 rounded-full hover:bg-themeGold focus:outline-none focus:ring focus:ring-themeGold"
            to={"/account/places/new"}
          >
            <img src={plusIcon} width={16} className="" /> Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div className="">
          <form action="" className="">
            {preInput("Title", "Customize the name for your place")}
            <input
              type="text"
              placeholder="ex: My lovely apt"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />

            {preInput("Address", "Address to your place")}
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />

            {preInput("Photos", "Let's see")}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add using a media link"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />
              <button
                className="place-self-center bg-themeBlue gray-200 h-[41.09px] px-4 rounded-2xl border hover:border-themeBlue hover:bg-themeGold focus:outline-none focus:ring focus:ring-themeBlue"
                onClick={addPhotoByLink}
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((photoLink) => (
                  <div key={photoLink} className="h-32 flex">
                    <img
                      src={`http://localhost:4000/uploads/` + photoLink}
                      alt="Picture of the unit"
                      className="rounded-2xl w-full object-cover"
                    />
                  </div>
                ))}
              {/* https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg */}
              <label className=" h-32 cursor-pointer flex items-center gap-2 border bg-transparent rounded-2xl p-8 ">
                <img src={uploadIcon} width={20} className="" /> Upload
                <input
                  type="file"
                  multiple
                  className=""
                  style={{ visibility: "hidden" }}
                  onChange={uploadPhoto}
                />
              </label>
            </div>

            {preInput("Description", "Description of the place")}
            <textarea
              className="border shadow"
              name=""
              cols="45"
              rows="4"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            ></textarea>

            {preInput("Perks", "Select all perks of your unit")}
            <PerkCards selected={perks} onSelected={setPerks} />

            {preInput(
              "Extra Info",
              "House rules, directions, minor details, etc."
            )}
            <textarea
              className="border shadow"
              name=""
              cols="45"
              rows="4"
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            ></textarea>

            {preInput(
              "Check-in/out details:",
              "Add check-in, check-out, and max guests"
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              {checkDetails.map((detail) => {
                return (
                  <div key={detail.name}>
                    <h3 className="mt-2 -mb-1">{detail.name}</h3>
                    <input
                      type={detail.inputType}
                      placeholder={detail.path}
                      value={detail.state}
                      onChange={(ev) => detail.setState(ev.target.value)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex place-content-center">
              <button className="bg-themeBlue w-9/12 rounded-md text-center mt-2 py-1 border hover:border-themeBlue hover:bg-themeGold focus:outline-none focus:ring focus:ring-themeBlue">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      my places
    </div>
  );
}

export default PlacesPage;
