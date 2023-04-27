
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { transportUtils }  from 'main/utils/transportUtils';
import TransportForm from 'main/components/Transports/TransportForm';
import { useNavigate } from 'react-router-dom'


export default function TransportEditPage() {
    let { id } = useParams();

    let navigate = useNavigate(); 

    const response = transportUtils.getById(id);

    const onSubmit = async (transport) => {
        const updatedTransport = transportUtils.update(transport);
        console.log("updatedTransport: " + JSON.stringify(updatedTransport));
        navigate("/transports");
    }  

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Edit Transport</h1>
                <TransportForm submitAction={onSubmit} buttonLabel={"Update"} initialContents={response.transport}/>
            </div>
        </BasicLayout>
    )
}


describe("TransportEditPage tests", () => {

    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <TransportEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields", async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <TransportEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("TransportForm-name")).toBeInTheDocument();
        expect(screen.getByDisplayValue('Inkstriker')).toBeInTheDocument();
        expect(screen.getByDisplayValue('kart')).toBeInTheDocument();
        expect(screen.getByDisplayValue('10000')).toBeInTheDocument();
    });

    test("redirects to /transports on submit", async () => {

        const restoreConsole = mockConsole();

        mockUpdate.mockReturnValue({
            "transport": {
                id: 3,
                name: "Mr. Scooty",
                mode: "scooter",
                cost: "100000"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <TransportEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();

        const modeInput = screen.getByLabelText("Mode");
        expect(modeInput).toBeInTheDocument();

        const costInput = screen.getByLabelText("Cost");
        expect(costInput).toBeInTheDocument();

        const updateButton = screen.getByText("Update");
        expect(updateButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Mr. Scooty' } })
            fireEvent.change(modeInput, { target: { value: 'scooter' } })
            fireEvent.change(costInput, { target: { value: '100000' } })
            fireEvent.click(updateButton);
        });

        await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/transports"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `updatedTransport: {"transport":{"id":3,"name":"Mr. Scooty","mode":"scooter","cost":"100000"}}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


