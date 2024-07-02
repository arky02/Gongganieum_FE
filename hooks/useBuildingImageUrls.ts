import axios from 'axios';
import { useEffect, useState } from 'react';

const useBuildingImageUrls = (address: string | undefined) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const getImageUrl = async () => {
    if (!address || imageUrls.length !== 0) {
      return;
    }
    const urls = await getBuildingImageUrls(address);
    setImageUrls(urls);
  };

  useEffect(() => {
    getImageUrl();
  }, [address]);

  return imageUrls;
};

export default useBuildingImageUrls;

const getBuildingImageUrls = async (address: string) => {
  const parsedAddress = address.split(' ').slice(2).join(' ');

  const imageUrls: string[] = [];
  while (true) {
    try {
      const imageCnt =
        imageUrls.length === 0 ? '' : ` (${imageUrls.length + 1})`;
      const url = `https://raw.githubusercontent.com/Neul-pum/PopPop_imgs/main/imgs/${parsedAddress}${imageCnt}.jpeg`;
      await axios.get(url);
      imageUrls.push(url);
    } catch {
      return imageUrls;
    }
  }
};
