import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { Query } from 'react-apollo';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      const count = data.itemsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page;
      return (
        <PaginationStyles>
          <Head>
            <title>
              Sick Fits | Page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch // fetch previous page
            href={{
              pathname: 'items',
              query: { page: page - 1 }
            }}>
            <a className="prev" aria-disabled={page <= 1}>
              &#8592; Prev
            </a>
          </Link>
          <p>
            Page {page} of {pages}
          </p>
          <p>{count} Items Total</p>
          <Link
            prefetch // fetch previous page
            href={{
              pathname: 'items',
              query: { page: page + 1 }
            }}>
            <a className="prev" aria-disabled={page >= pages}>
              Next &#8594;
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
