const getOffset = (limit = 5, page = 1) => (page - 1) * limit;
const getPagination = (limit = 5, page = 1, total = 50) => {
  const totalPage = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);
  const currentPage = page < 1 ? 1 : page > totalPage ? totalPage : page;
  const hasPrevPage = currentPage - 1 > 1;
  const hasNextPage = currentPage + 1 < totalPage;
  return {
    pages,
    totalPage,
    currentPage,
    hasPrevPage,
    hasNextPage,
  };
};
module.exports = {
  getOffset,
  getPagination,
};
