import React, {useState} from 'react';
import {Image} from 'react-native';

interface IProps {
  src: string;
  src2?: string;
  imageStyles: object;
  mockImg: object;
}

export const CustomImage = ({src, src2, imageStyles, mockImg}: IProps) => {
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  return (
    <Image
      onError={
        src2
          ? error
            ? () => setError1(true)
            : () => setError(true)
          : () => setError(true)
      }
      style={imageStyles}
      source={
        error
          ? src2
            ? error1
              ? mockImg
              : {
                  uri: `https://assets.jokerlivestream.vip/${
                    src2?.[0] === '/' ? src2.slice(1, src2.length) : src2
                  }`,
                }
            : mockImg
          : {
              uri: `https://assets.jokerlivestream.vip/${
                src?.[0] === '/' ? src.slice(1, src.length) : src
              }`,
            }
      }
    />
  );
};
