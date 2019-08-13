import React from 'react';
import Link from 'next/link';

const Home = props => (
  <div>
    <p>HeY!</p>
    <Link href="/sell">
      <a>Sell!</a>
    </Link>
  </div>
);

export default Home;
