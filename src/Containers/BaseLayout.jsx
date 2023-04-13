import React from "react";
import { useMachine } from "@xstate/react";
import { StepsLayout } from "./StepsLayout";
import { Nav } from "../Components/Nav";
import { Welcome } from "../Components/Welcome";
import { Search } from "../Components/Search";
import { Passengers } from "../Components/Passengers";
import { Tickets } from "../Components/Tickets";
import bookingMachine from "../Machines/bookingMachine";
import "./BaseLayout.css";

export const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine);

  console.log("state: ", state.value);

  return (
    <div className="BaseLayout">
      <Nav state={state} send={send} />
      <StepsLayout state={state} send={send}>
        {state.matches("initial") && <Welcome send={send} />}
        {state.matches("search") && <Search send={send} />}
        {state.matches("tickets") && <Tickets send={send} />}
        {state.matches("passengers") && <Passengers send={send} />}
      </StepsLayout>
    </div>
  );
};
