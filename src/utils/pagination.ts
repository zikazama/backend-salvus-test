// src/utils/pagination.ts
export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

export const getPagingData = (data: [any[], number], page: number, limit: number) => {
  const [results, totalItems] = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, data: results, totalPages, currentPage };
};

