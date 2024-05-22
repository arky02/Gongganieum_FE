export const searchAddress = async (
  map: naver.maps.Map | undefined,
  address: string,
) => {
  console.log(window.naver.maps);

  if (!map) {
    return;
  }

  window.naver.maps.Service.geocode({ query: address }, (status, response) => {
    // if (status === naver.maps.Service.Status.ERROR) {
    //   return alert('Something Wrong!');
    // }

    // if (response.v2.meta.totalCount === 0) {
    //   return alert('totalCount' + response.v2.meta.totalCount);
    // }

    const address = response.v2.addresses[0];
    const point = new naver.maps.Point(Number(address.x), Number(address.y));

    map.setCenter(point);
  });
};
