// src/utils/pagination.ts
export const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  
  export const getPagingData = (data: any, page: number, limit: number) => {
    const { count: totalItems, rows: results } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, results, totalPages, currentPage };
  };
  