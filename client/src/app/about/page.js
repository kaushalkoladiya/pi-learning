'use client';

import React from 'react'
import { useAppSelector } from '@/redux/hooks.js';

const AboutPage = () => {
  const state = useAppSelector(state => state);

  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About page content.</p>
    </div>
  )
}

export default React.memo(AboutPage);