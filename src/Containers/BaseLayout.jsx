import React from "react";

import { useMachine } from "@xstate/react";

import { StepsLayout } from "./StepsLayout";

import { Nav } from "../Components/Nav";
import { Welcome } from "../Components/Welcome";
import { Search } from "../components/Search";
import { Passengers } from "../components/Passengers";
import { Tickets } from "../Components/Tickets";

import bookingMachine from "../Machines/bookingMachine";

import "./BaseLayout.css";

export const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine);

  console.log("state: ", state.value, state.context);

  return (
    <div className="BaseLayout">
      <Nav state={state} send={send} />
      <StepsLayout state={state} send={send}>
        {state.matches("initial") && <Welcome send={send} />}
        {state.matches("search") && <Search state={state} send={send} />}
        {state.matches("tickets") && <Tickets send={send} />}
        {state.matches("passengers") && (
          <Passengers state={state} send={send} />
        )}
      </StepsLayout>
    </div>
  );
};
