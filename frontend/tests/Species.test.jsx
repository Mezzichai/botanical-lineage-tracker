import { describe, expect, it} from 'vitest';
import {screen, render, waitFor, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../src/store'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '../src/routeTree.gen'


describe("modifying species", () => {
  const router = createRouter({ routeTree })

  it("species displays", async () => {
    render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    )
    await waitFor(() => {
      expect(screen.queryAllByLabelText(/item-[\d]+/).length).toBe(0)
    })

    await waitFor(() => {
      expect(screen.queryAllByLabelText("add-new-item").length).toBe(1)
    })
  });



  it("add species", async () => {
    render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    )

    await waitFor(() => {
      expect(screen.queryAllByLabelText(/item-[\d]+$/).length).toBe(0)
    })

    await waitFor(() => {
      expect(screen.queryAllByLabelText("add-new-item").length).toBe(1)
    })

    const createSpeciesButton = screen.queryByLabelText("add-new-item");
    fireEvent.click(createSpeciesButton)

    await waitFor(() => {
      expect(screen.queryByLabelText("name-input")).toBeInTheDocument()
    })

    const speciesNameField = screen.queryByLabelText("name-input");
    const speciesName = "item 1"

    fireEvent.change(speciesNameField, { target: { value: speciesName } });

    const confirmSpeciesButton = screen.queryByLabelText("confirm-changes");
    fireEvent.click(confirmSpeciesButton)

    await waitFor(() => {
      expect(screen.queryAllByLabelText(/item-[\d]+$/).length).toBe(1)
    })
  });



  it("edit species", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
    
    await waitFor(() => {
      expect(screen.queryAllByLabelText(/item-[\d]+$/).length).toBe(1)
    })

    const speciesItemInfoButton = screen.queryByLabelText("item-1-info");
    fireEvent.click(speciesItemInfoButton);
   
    const editButton = screen.queryByLabelText("edit-item");
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.queryByLabelText("edit-name")).toBeInTheDocument()
    })

    const speciesNameField = screen.queryByLabelText("name-input");
    const speciesName = "new species 1 name";

    fireEvent.change(speciesNameField, { target: { value: "" } });
    fireEvent.change(speciesNameField, { target: { value: speciesName } });

    const confirmSpeciesEditButton = screen.queryByLabelText("confirm-changes");
    fireEvent.click(confirmSpeciesEditButton);
    
    await waitFor(() => {
      expect(screen.queryByText("new species 1 name")).toBeInTheDocument();
    });
  });



  it("remove species", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
    
    await waitFor(() => {
      expect(screen.queryAllByLabelText(/item-[\d]+$/).length).toBe(1)
    })

    const speciesItemInfoButton = screen.queryByLabelText("item-1-info");
    fireEvent.click(speciesItemInfoButton);
   
    const editButton = screen.queryByLabelText("edit-item");
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.queryByLabelText("delete-item")).toBeInTheDocument()
    })

    const deleteSpeciesButton = screen.queryByLabelText("delete-item");
    fireEvent.click(deleteSpeciesButton)

    await waitFor(() => {
      expect(screen.queryAllByLabelText(/item-[\d]+$/).length).toBe(0)
    })
  });
}) 