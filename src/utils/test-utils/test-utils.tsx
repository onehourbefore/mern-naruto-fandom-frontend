import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { setupStore } from './testStore';
import type { AppStore, RootState } from './testStore';


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
};


export function renderWithProviders (
  ui: { elem: React.ReactElement, path?: string },
  // routeComponent?: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {} ) 
  
{
  function Wrapper ({ children }: PropsWithChildren <{}>): JSX.Element {
    return (
      <MemoryRouter initialEntries={[ui.path ?? '/']}>
        <Provider store={store}>
          {/* {routeComponent} */}
          {children}
        </Provider>
      </MemoryRouter>
    )
  }

  return { store, ...render (ui.elem, { wrapper: Wrapper, ...renderOptions }) }
};