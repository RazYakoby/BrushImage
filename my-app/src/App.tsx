import { readFile } from 'fs';
import React, { useState } from 'react';

function App() {

  const [imageSrc, setImageSrc] = useState('');
  const [convertToblackAndWhiteColorSrc, SetConvertToblackAndWhiteColorSrc] = useState('');
  const [imageToConvert, setImage] = useState('');

  const handleImageUpload = (e:any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result as string);
    }
    reader.readAsDataURL(file);
  }

  const convertToBlackAndWhite = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const img = new Image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      setImage(img.src);
      context?.drawImage(img, 0, 0);
      const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData?.data;
      if(data){
        for (let val = 0; val < data?.length; val+=4){
          const avg = (data[val] + data[val + 1] + data[val + 2]) / 3;

          data[val] = avg;
          data[val + 1] = avg;
          data[val + 2] = avg;
        }

        context?.putImageData(imageData, 0, 0);
      }
      SetConvertToblackAndWhiteColorSrc(canvas.toDataURL());
    }
    img.src = imageSrc;
    
  }


  return (
    <div>
      <h1>Image to Black and White Converter</h1>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={convertToBlackAndWhite}>Convert to Black and White</button>
      {convertToblackAndWhiteColorSrc && (
        <div>
          <h2>Black and White Image</h2>
          <img id='image' src={imageToConvert} alt='image'/>
          <img src={convertToblackAndWhiteColorSrc} alt="Black and White" />
        </div>
      )}
    </div>
  );
}

export default App;
