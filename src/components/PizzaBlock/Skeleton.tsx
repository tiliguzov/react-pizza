import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="259" rx="10" ry="10" width="280" height="27" />
    <circle cx="135" cy="115" r="115" />
    <rect x="0" y="307" rx="13" ry="13" width="280" height="88" />
    <rect x="0" y="426" rx="10" ry="10" width="90" height="27" />
    <rect x="124" y="417" rx="17" ry="17" width="152" height="45" />
  </ContentLoader>
);
