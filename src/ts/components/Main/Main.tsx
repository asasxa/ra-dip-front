import React, { ReactNode } from 'react';
import { Banner } from './Banner/Baner';

type Props = { children: ReactNode }

export function Main({ children }: Props): JSX.Element {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          {children}
        </div>
      </div>
    </main>
  )
}