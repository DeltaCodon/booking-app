import { forwardRef, useImperativeHandle, useRef } from "react";
import closeButton from "/closeButtonIcon.svg";

const PhotoModal = forwardRef(function PhotoModal({ allPhotos, onReset }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  return (
    <dialog
      className="bg-transparent border border-1 border-black  "
      ref={dialog}
    >
      <div className="grid grid-cols-2 w-full h-full gap-3 py-4 bg-gradient-to-t from-themeGold/45 via-white/85 to-themeBlue/75 ">
        {allPhotos?.media.length > 0 &&
          allPhotos.media.map((photo) => (
            <div key={`${photo}`} className="w-full py-1 place-self-center">
              <img
                src={"http://localhost:4000/uploads/" + photo}
                alt="more photos"
                className="w-10/12 place-self-center border border-gray-700 border-2 rounded-lg shadow shadow-md hover:shadow-2xl"
              />
            </div>
          ))}
        <button
          className="border rounded-full border-1 border-black absolute top-2 right-2 h-7 w-7 bg-white"
          onClick={() => {
            onReset();
          }}
        >
          <img src={closeButton} alt="close overlay with more unit pictures" />
        </button>
      </div>
    </dialog>
  );
});

export default PhotoModal;
