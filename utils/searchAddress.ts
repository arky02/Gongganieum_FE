export const searchAddress = async (
  address: string,
  callback: (
    status: naver.maps.Service.Status,
    response: naver.maps.Service.GeocodeResponse,
  ) => void,
) => {
  window.naver.maps?.Service?.geocode({ query: address }, callback);
};
