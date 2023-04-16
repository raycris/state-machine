import { assign, createMachine } from "xstate";
import { fetchCountries } from "../utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "getCountries",
        src: () => fetchCountries,
        onDone: {
          target: "success",
          actions: assign({ contries: (context, event) => event.data }),
        },
        onError: {
          target: "failure",
          actions: assign({ error: "Falló el request" }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine(
  {
    id: "Buy plane tickets",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: "",
      countries: [],
      error: "",
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
          },
        },
      },
      search: {
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: (context, event) => event.selectedCountry,
            }),
          },
          CANCEL: "initial",
        },
        ...fillCountries,
      },
      passengers: {
        on: {
          DONE: "tickets",
          CANCEL: {
            target: "initial",
            actions: assign({ selectedCountry: "", passengers: [] }),
          },
          ADD: {
            target: "passengers",
            actions: assign((context, event) =>
              context.passengers.push(event.newPassenger)
            ),
          },
        },
      },
      tickets: {
        on: {
          FINISH: "initial",
        },
      },
    },
  },
  {
    actions: {
      imprimirInicio: () => console.log("imprimir inicio"),
      imprimiEntrada: () => console.log("imprimir entreada a search"),
      imprimiSalida: () => console.log("imprimir salida del search"),
    },
  }
);

export default bookingMachine;
