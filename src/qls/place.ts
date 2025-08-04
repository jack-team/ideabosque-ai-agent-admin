export const getPlaceListQl = `
 query placeList(
    $pageNumber: Int, 
    $limit: Int, 
    $region: String, 
    $latitude: String, 
    $longitude: String, 
    $businessName: String, 
    $address: String, 
    $website: String
 ) {
    placeList(
      pageNumber: $pageNumber, 
      limit: $limit, 
      region: $region, 
      latitude: $latitude, 
      longitude: $longitude, 
      businessName: $businessName, 
      address: $address, 
      website: $website
    ) {
        pageSize 
        pageNumber 
        total 
        placeList { 
        region 
        placeUuid 
        latitude 
        longitude 
        businessName 
        address 
        phoneNumber 
        website 
        types 
        updatedBy 
        updatedAt 
        createdAt 
      }
    }
  }
`;