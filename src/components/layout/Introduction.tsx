import React from 'react';

export default function Introduction( { children }: { children: React.ReactNode }) {
  return(
    <article className="story-container">
      { children }
    </article>
  )
}