import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    const { getByTestId } = render(<Home />);

    const eventListElement = getByTestId("event-list"); // <div data-testid="event-list" id="events" className="noSpaceAround"> (Events)
    expect(eventListElement).toBeInTheDocument();
  })
  it("a list a people is displayed", () => {
    const { getAllByTestId } = render(<Home />); // <div data-testid="people-card" className="PeopleCard"> (PeopleCard)

    const peopleCards = getAllByTestId("people-card");
    expect(peopleCards).toHaveLength(6);
  })
  it("a footer is displayed", () => {
    const { getByTestId } = render(<Home />);

    const footerElement = getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", () => {
    const { getByTestId } = render(<Home />);

    const lastEventElement = getByTestId("last-event");
    expect(lastEventElement).toBeInTheDocument();

    const EventCardElement = getByTestId("card-testid");
    expect(EventCardElement).toBeInTheDocument();
  })
});