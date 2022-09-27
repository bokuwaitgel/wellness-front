import React from 'react';

import { Head } from '../components/Head';

export const Access = () => {
  var query = window.location.search.substring(1);
  return (
    <>
      <Head title="Access" description="hello" />
      {JSON.stringify(query)}
    </>
  );
};
