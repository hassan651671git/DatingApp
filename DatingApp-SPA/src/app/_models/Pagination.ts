export interface Pagination {
currentPage:number;
totalPages:number;
totalItems:number;
itemsPerPage:number;
}


export class PaginatedResult<T>{
   public result?:T;
   public pagination?:Pagination;
}
