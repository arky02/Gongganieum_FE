import { useQuery } from '@tanstack/react-query';
import { CATEGORY, MARKER_ICON_SRC } from 'constants/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStore } from 'store';
import useSession from 'hooks/useSession';
import { getIsDefaultMarkersVisible } from 'utils/getIsDefaultMarkersVisible';
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

  const [defaultMarkers, setDefaultMarkers] = useState<any[]>([]);
  const isDefaultVisible = getIsDefaultMarkersVisible(router.query);

  const showDefaultLikedMarkers = () => {
    if (!map || !buildings) {
      return;
    }

    hideDefaultLikedMarkers();

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
        const { as, q, cate, isliked } = router.query;
        router.push({
          query: { as, q, cate, isliked, building: building._id },
        });
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
    if (isDefaultVisible) {
      hideFilteredLikedMarkers();
      showDefaultLikedMarkers();
    } else {
      hideDefaultLikedMarkers();
    }
  }, [map, buildings, likeBuildingIds, router.query]);

  const [filteredMarkers, setFilteredMarkers] = useState<any[]>([]);

  const showFilteredLikedMarkers = () => {
    if (!map || !buildings) {
      return;
    }

    hideFilteredLikedMarkers();

    const likedBuildings = buildings.filter((building) =>
      likeBuildingIds?.includes(building._id),
    );

    const bound = new window.kakao.maps.LatLngBounds();

    likedBuildings.forEach((building) => {
      const coord = building.coord.split(',');
      const position = new window.kakao.maps.LatLng(coord[0], coord[1]);
      bound.extend(position);

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
        const { as, q, cate, isliked } = router.query;
        router.push({
          query: { as, q, cate, isliked, building: building._id },
        });
      });
      setFilteredMarkers((prev) => [...prev, marker]);
      marker.setMap(map);
      marker.setVisible(true);
    });

    if (buildings.length) {
      map.panTo(bound);
    }
  };

  const hideFilteredLikedMarkers = () => {
    filteredMarkers.forEach((marker) => marker.setMap(null));
    setFilteredMarkers([]);
  };

  useEffect(() => {
    if (router.query['isliked'] === 'true') {
      hideDefaultLikedMarkers();
      showFilteredLikedMarkers();
    } else {
      hideFilteredLikedMarkers();
    }
  }, [router.query]);
};

export default useLikedMarkers;
