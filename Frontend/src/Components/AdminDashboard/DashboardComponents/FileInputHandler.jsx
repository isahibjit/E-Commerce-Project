import React, { useRef, useState } from "react";
import uploadImgIcon from "../../../assets/uploadImg.png";


const FileInputHandler = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const fileInputs = useRef([]);
  
  return (
    <div className="flex gap-3  ">
      {images.map((image, index) => (
          <div key={index}>
          <input
          id={index}
          onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                  const newImages = [...images];
                  newImages[index] = URL.createObjectURL(file);
                  setImages(newImages);
                }
            }}
            ref={(el)=>(fileInputs.current[index] = el)}
            type="file"
            className="hidden"
            />
          <img
            src={image || uploadImgIcon}
            alt="uploadImgIcon"
            className="admin-upload-img object-cover"
            onClick={() => {
                fileInputs.current[index].click()
            }}
            />
  </div>
      ))}
    </div>
  );
};

export default FileInputHandler;
