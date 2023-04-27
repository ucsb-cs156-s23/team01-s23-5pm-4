import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import BookEditPage from "main/pages/Books/BookEditPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

const mockUpdate = jest.fn();
jest.mock('main/utils/bookUtils', () => {
    return {
        __esModule: true,
        bookUtils: {
            update: (_book) => {return mockUpdate();},
            getById: (_id) => {
                return {
                    book: {
                        id: 3,
                         name: "Parameterized Algorithms",
                         author: "Daniel Lokshtanov"
                        //  genre: "Fantasy",
                        //  wordcount: "too many",     
                    }
                }
            }
        }
    }
});


describe("BookEditPage tests", () => {

    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields", async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookEditPages />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("BookForm-name")).toBeInTheDocument();
        expect(screen.getByDisplayValue('Parameterized Algorithms')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Daniel Lokshtanov')).toBeInTheDocument();
    });

    test("redirects to /books on submit", async () => {

        const restoreConsole = mockConsole();

        mockUpdate.mockReturnValue({
            "book": {
                id: 3,
                name: "Parameterized Algorithms",
                author: "Daniel Lokshtanov"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();


        const authorInput = screen.getByLabelText("Author");
        expect(authorInput).toBeInTheDocument();

        const updateButton = screen.getByText("Update");
        expect(updateButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Parameterized Algorithms' } })
            fireEvent.change(authorInput, { target: { value: 'Daniel Lokshtanov' } })
            fireEvent.click(updateButton);
        });

        await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/books"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `createdBook: {"book":{
            "id": 3,
             "name": "Parameterized Algorithms",
             "author": "Daniel Lokshtanov",
             "genre": "Fantasy",
             "word count": "too many",     
        }`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


