import React, { useRef } from "react";
import morePhotos from "/morePhotosIcon.svg";
import PhotoModal from "./PhotoModal";

function PlaceGallery({ place }) {
  const dialog = useRef();

  function showModal() {
    dialog.current.open();
  }
  function resetModal() {
    dialog.current.close();
  }
  return (
    <div className="">
      <PhotoModal ref={dialog} allPhotos={place} onReset={resetModal} />
      <div className="relative mb">
        <div
          id="middle"
          className="grid grid-cols-[1fr_1fr] gap-2 sm: grid sm:grid-cols-[2fr_1fr] md:grid md:grid-cols-[2fr_1fr] lg:grid lg:grid-cols-[2fr_1fr]"
        >
          <div className="">
            {place.media?.[0] && (
              <div className="w-fit">
                <img
                  className="rounded-l-2xl object-cover aspect-square w-full h-full min-w-[282.33px] min-h-[282.33px] sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full max-h-[525px] max-w-[525px]"
                  src={"http://localhost:4000/uploads/" + place.media?.[0]}
                  alt="Image of the unit"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.media?.[1] && (
              <img
                className="rounded-r-2xl object-cover aspect-square w-[50px] h-[50px] min-h-[132.77px] min-w-[130.77px] sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full max-h-[262px]"
                src={"http://localhost:4000/uploads/" + place.media?.[1]}
                alt="More images of the unit"
                onClick={() => showModal()}
              />
            )}
            <div className="overflow-hidden">
              {place.media?.[2] && (
                <img
                  className="rounded-r-2xl object-cover aspect-square relative top-2 w-[60px] h-[60px] min-h-[132.77px] min-w-[130.77px] sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full  max-h-[262px]"
                  src={"http://localhost:4000/uploads/" + place.media?.[2]}
                  alt="More images of the unit"
                  onClick={() => showModal()}
                />
              )}
            </div>
          </div>
        </div>
        <button
          className="absolute bottom-2 text-sm w-44 right-2 py-1 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 overflow-hidden"
          onClick={() => showModal()}
        >
          <img
            src={morePhotos}
            alt="Show more photos button"
            className="max-h-5 inline-block"
          />
          <p className="inline">&nbsp;Show more photos</p>
        </button>
      </div>
    </div>
  );
}

export default PlaceGallery;
