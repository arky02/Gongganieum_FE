import { useQuery } from '@tanstack/react-query';
import { CATEGORY, MARKER_ICON_SRC } from 'constants/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStore } from 'store';
import useSession from 'hooks/useSession';
import { getLikeBuildingIds } from 'apis/api';
import { BuildingType, CategoryType } from 'types/client.types';

const useLikedMarkers = (buildings: BuildingType[]) => {
  const { getSession } = useSession();
  const session = getSession();
  const router = useRouter();
  const { map } = useStore((state) => ({
    map: state.map,
  }));

  const { data: likeBuildingIds } = useQuery({
    queryKey: ['user', 'likeBuildingIds'],
    queryFn: () => getLikeBuildingIds(),
    enabled: session,
  });

  const showDefaultMarkers =
    (!router.query['q'] &&
      (router.query['cate'] === '전체' || !router.query['cate']) &&
      router.query['isours'] === 'false' &&
      router.query['isliked'] === 'false') ||
    (router.query['building'] && router.query['cate'] === '전체');
  const [defaultMarkers, setDefaultMarkers] = useState<any[]>([]);

  const showDefaultLikedMarkers = () => {
    if (!map || !buildings) {
      return;
    }

    defaultMarkers.forEach((marker) => marker.setMap(null));
    setDefaultMarkers([]);

    const likedBuildings = buildings.filter((building) =>
      likeBuildingIds?.includes(building._id),
    );

    likedBuildings.forEach((building) => {
      const coord = building.coord.split(',');
      const position = new window.kakao.maps.LatLng(coord[0], coord[1]);

      const category = CATEGORY.includes(building.cate as CategoryType)
        ? building.cate
        : '기타';

      const imageSrc = MARKER_ICON_SRC[category].liked;
      const imageSize = new window.kakao.maps.Size(48, 48);
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
      );

      const marker = new window.kakao.maps.Marker({
        map,
        position,
        image: markerImage,
        clickable: true,
        zIndex: 50,
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        const currCate = router.query['cate'];
        router.push({ query: { cate: currCate, building: building._id } });
      });
      setDefaultMarkers((prev) => [...prev, marker]);
      marker.setMap(map);
      const zoomLevel = map.getLevel();
      marker.setVisible(zoomLevel <= 6);
      window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
        const zoomLevel = map.getLevel();
        const isSet = !!marker.getMap();
        if (isSet) {
          if (zoomLevel <= 6) {
            marker.setVisible(true);
          } else {
            marker.setVisible(false);
          }
        }
      });
    });
  };

  const hideDefaultLikedMarkers = () => {
    defaultMarkers.forEach((marker) => marker.setMap(null));
    setDefaultMarkers([]);
  };

  useEffect(() => {
    if (showDefaultMarkers) {
      showDefaultLikedMarkers();
    } else {
      hideDefaultLikedMarkers();
    }
  }, [map, buildings, likeBuildingIds, router.query]);
};

export default useLikedMarkers;
