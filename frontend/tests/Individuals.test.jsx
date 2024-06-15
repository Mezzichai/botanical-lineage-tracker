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
<<<<<<< HEAD
  it("individuals display on tree", async () => {
=======
  it("individuals display", async () => {
>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
<<<<<<< HEAD

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

    const species = screen.getAllByLabelText(/item-[\d]+$/)
    fireEvent.click(species)
    await waitFor(() => {
      expect(screen.queryAllByLabelText("Create a root plant").length).toBe(1)
    })
  });


  
  it("individuals display on grid", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )

    const species = screen.getAllByLabelText(/item-[\d]+$/)
    fireEvent.click(species)
    await waitFor(() => {
      expect(screen.queryAllByLabelText("Create a root plant").length).toBe(1)
    })

    const gridButton = screen.getAllByLabelText("Grid view")
    fireEvent.click(gridButton)

    await waitFor(() => {
      expect(screen.queryAllByLabelText("add-new-item").length).toBe(1)
    })
  });



=======
  });

>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
  it("add individual", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
<<<<<<< HEAD

    const species = screen.getAllByLabelText(/item-[\d]+$/)
    fireEvent.click(species)
    await waitFor(() => {
      expect(screen.queryAllByLabelText("Create a root plant").length).toBe(1)
    })

    const gridButton = screen.getAllByLabelText("Grid view")
    fireEvent.click(gridButton)

    await waitFor(() => {
      expect(screen.queryAllByLabelText("add-new-item").length).toBe(1)
    })

    const addNewItemButton = screen.getAllByLabelText("add-new-item")

    fireEvent.click(addNewItemButton)

    await waitFor(() => {
      expect(screen.queryByLabelText("name-input")).toBeInTheDocument()
    })

    const confirmButton = screen.queryByLabelText("confirm-changes");
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(screen.queryAllByLabelText(/item-[\d]+$/).length).toBe(1)
    })
  });



=======
  });

>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
  it("edit individual", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
<<<<<<< HEAD

    const species = screen.getAllByLabelText(/item-[\d]+$/)
    fireEvent.click(species)

    await waitFor(() => {
      expect(screen.queryAllByLabelText(/item-[\d]+$/).length).toBe(1)
    });

    const itemInfoButton = screen.queryByLabelText("item-1-info");
    fireEvent.click(itemInfoButton);
   
    const editButton = screen.queryByLabelText("edit-item");
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.queryByLabelText("edit-name")).toBeInTheDocument()
    });

    const nameField = screen.queryByLabelText("name-input");
    const name = "I001 edited";

    fireEvent.change(nameField, { target: { value: "" } });
    fireEvent.change(nameField, { target: { value: name } });

    const confirmSpeciesEditButton = screen.queryByLabelText("confirm-changes");
    fireEvent.click(confirmSpeciesEditButton);
    
    await waitFor(() => {
      expect(screen.queryByText(name)).toBeInTheDocument();
    });
  });



=======
  });

>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
  it("remove individual", async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
<<<<<<< HEAD

    const species = screen.getAllByLabelText(/item-[\d]+$/)
    fireEvent.click(species)

    await waitFor(() => {
      expect(screen.queryAllByLabelText(/item-[\d]+$/).length).toBe(1)
    })

    const itemInfoButton = screen.queryByLabelText("item-1-info");
    fireEvent.click(itemInfoButton);
   
    const editButton = screen.queryByLabelText("edit-item");
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.queryByLabelText("delete-item")).toBeInTheDocument()
    })

    const deleteButton = screen.queryByLabelText("delete-item");
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(screen.queryAllByLabelText(/item-[\d]+$/).length).toBe(0)
    })
=======
>>>>>>> 456fd0ff0aea78244730fbd1fb016d73f6a72be8
  });
}) 