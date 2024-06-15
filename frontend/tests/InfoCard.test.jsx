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
<<<<<<< HEAD


  
=======
>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
  it("info card closes", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
  });
}) 