import { countCustomers, findCustomerById, findCustomers } from '../db';

import type { GetCustomersParams } from '../types';

export const getCustomers = async (params: GetCustomersParams) => {
  const offset = (params.page - 1) * params.itemsPerPage;

  const [customers, totalCount] = await Promise.all([
    findCustomers(
      { q: params.q || '', status: params.status || 'ALL' },
      {
        offset,
        itemsPerPage: params.itemsPerPage,
        sort: params.sort,
        order: params.order,
      }
    ),
    countCustomers({ q: params.q || '', status: params.status || 'ALL' }),
  ]);

  return {
    customers,
    totalPages: Math.ceil(totalCount / params.itemsPerPage),
    totalCount,
  };
};

export const getCustomerById = async (id: number) => {
  const customer = await findCustomerById(id);
  return customer;
};
