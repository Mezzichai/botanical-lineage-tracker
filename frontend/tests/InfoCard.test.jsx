import { describe, expect, it} from 'vitest';
import {screen, render, waitFor, fireEvent } from '@testing-library/react'
import { GlobalProvider } from '../src/context/GlobalContext';
import { afterEach} from 'node:test';
import { Provider } from 'react-redux'
import store from './store'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'


describe("info card", () => {
  const router = createRouter({ routeTree })

  it("info card opens", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
  });
  it("info card closes", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
  });
}) 