import React from "react";
import uploadIcon from "/uploadIcon.svg";
import axios from "axios";
import { useState } from "react";

const PhotosUploader = ({ addedPhotos, whenChanged }) => {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(event) {
    event.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    whenChanged((prev) => {
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
        whenChanged((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <>
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
    </>
  );
};

export default PhotosUploader;
