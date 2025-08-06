export const requestListQl = `
 query contactRequestList(
 $pageNumber: Int, 
 $limit: Int, 
 $documentSource: String, 
 $userInquiry: String, 
 $cypherQuery: String, 
 $isSimilaritySearch: Boolean
 ) {
    contactRequestList(
    pageNumber: $pageNumber, 
    limit: $limit, 
    documentSource: $documentSource, 
    userInquiry: $userInquiry, 
    cypherQuery: $cypherQuery, 
    isSimilaritySearch: $isSimilaritySearch
  ) {
        pageSize 
        pageNumber 
        total 
        contactRequestList { 
          documentSource 
          requestUuid 
          userQuery 
          cypherQuery 
          isSimilaritySearch 
          results 
          requestNote 
          createdAt 
          updatedBy 
          updatedAt 
       }
  }
}
`;