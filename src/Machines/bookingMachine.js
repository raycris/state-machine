import { assign, createMachine } from "xstate";

const bookingMachine = createMachine(
  {
    id: "Buy plane tickets",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: "",
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
      },
      passengers: {
        on: {
          DONE: "tickets",
          CANCEL: "initial",
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
