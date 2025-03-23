import { Filter, Pagination, Sort } from './dto/filter.dto';

export const filterHelper = (
  filter: Filter,
  pagination: Pagination,
  sort: Sort,
) => {
  let find = {};
  let where = {};
  if (filter) {
    if (filter.id) {
      where = { ...where, id: filter.id };
    }
    if (filter.name) {
      where = { ...where, name: { contains: filter.name } };
    }
    if (filter.type) {
      where = { ...where, type: { contains: filter.type } };
    }
  }
  if (pagination) {
    if (pagination.offset) {
      find = { ...find, skip: pagination.offset };
    }
    if (pagination.limit) {
      find = { ...find, take: pagination.limit };
    }
  }
  if (sort) {
    find = { ...find, orderBy: { [sort['field']]: sort.order } };
  }
  return { where, ...find };
};
