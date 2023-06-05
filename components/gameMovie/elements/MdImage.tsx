import { FC } from "react";

type MdImageType = {
  src?: string;
  alt?: string;
  title?: string;
};

const MdImage: FC<MdImageType> = (props) => {
  const { src, alt, title } = { ...props };

  return <img src={src} alt={alt} title={title} width="80%" />;
};

export default MdImage;