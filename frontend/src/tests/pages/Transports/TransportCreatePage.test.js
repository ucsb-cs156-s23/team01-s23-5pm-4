import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import TransportCreatePage from "main/pages/Transports/TransportCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockAdd = jest.fn();
jest.mock('main/utils/transportUtils', () => {
    return {
        __esModule: true,
        transportUtils: {
            add: () => { return mockAdd(); }
        }
    }
});

describe("TransportCreatePage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <TransportCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("redirects to /transports on submit", async () => {

        const restoreConsole = mockConsole();

        mockAdd.mockReturnValue({
            "transport": {
                id: 3,
                name: "Inkstriker",
                mode: "kart",
                cost: "10000"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <TransportCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();

        const modeInput = screen.getByLabelText("Mode");
        expect(modeInput).toBeInTheDocument();

        const costInput = screen.getByLabelText("Cost");
        expect(costInput).toBeInTheDocument();

        const createButton = screen.getByText("Create");
        expect(createButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Inkstriker' } })
            fireEvent.change(modeInput, { target: { value: 'kart' } })
            fireEvent.change(costInput, { target: { value: '10000' } })
            fireEvent.click(createButton);
        });

        await waitFor(() => expect(mockAdd).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/transports"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `createdTransport: {"transport":{"id":3,"name":"Inkstriker","mode":"kart","cost":"10000"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


