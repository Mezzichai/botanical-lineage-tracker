import { describe, expect, it} from 'vitest';
import {screen, render, waitFor, fireEvent } from '@testing-library/react'
import { GlobalProvider } from '../src/context/GlobalContext';
import { afterEach} from 'node:test';
import { Provider } from 'react-redux'
import store from './store'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'


describe("individuals", () => {
  const router = createRouter({ routeTree })
  it("individuals display", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
  });

  it("add individual", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
  });

  it("edit individual", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
  });

  it("remove individual", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
  });
}) 