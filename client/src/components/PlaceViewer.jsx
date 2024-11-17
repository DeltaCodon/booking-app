import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlaceViewer = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-8 bg-slate-200 -mx-8 px-8 py-">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="my-2 block font-semibold underline"
        href={"https://maps.google.com/?q=" + place.address}
        target="_blank"
      >
        {place.address}
      </a>
      <div className="grid grid-cols-[1fr_1fr] gap-2 sm: grid sm:grid-cols-[2fr_1fr] md:grid md:grid-cols-[2fr_1fr] lg:grid lg:grid-cols-[2fr_1fr]">
        <div className="">
          {place.media?.[0] && (
            <div className="">
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
            />
          )}
          {place.media?.[2] && (
            <div className="overflow-hidden">
              <img
                className="rounded-r-2xl object-cover aspect-square relative top-2 w-[60px] h-[60px] min-h-[132.77px] min-w-[130.77px] sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full  max-h-[262px]"
                src={"http://localhost:4000/uploads/" + place.media?.[2]}
                alt="More images of the unit"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceViewer;
