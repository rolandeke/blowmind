import React, { useEffect, useState } from 'react';
// import withAuth from '../../hoc/withAuth';
import Home from '../../pages/blog/Home';

const BlogHome: React.FC = () => {

  const [screenWidth, setScreenWidth] = useState(1024);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenWidth();

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, [])


  return <Home sw={screenWidth} />;
};

export default BlogHome;
