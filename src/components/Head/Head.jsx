import { Helmet } from 'react-helmet-async';

export const Head = ({ title = '', description = '' }) => {
  return (
    <Helmet title={title ? `${title} ` : undefined} defaultTitle="Amita">
      <meta name="description" content={description} />
    </Helmet>
  );
};
