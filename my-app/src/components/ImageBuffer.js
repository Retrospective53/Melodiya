import Image from "next/image";
import { Buffer } from "buffer";

const ImageBuffer = ({ imageBuffer }) => {
  const base64Image = Buffer.from(imageBuffer).toString("base64");
  const imageUrl = `data:image/jpeg;base64,${base64Image}`;

  return (
    <div>
      <Image src={imageUrl} width={300} height={300} alt="coverImage" />
    </div>
  );
};

export default ImageBuffer;
