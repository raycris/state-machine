import { createMachine } from "xstate";

const bookingMachine = createMachine(
  {
    id: "Buy plane tickets",
    initial: "initial",
    states: {
      initial: {
        on: {
          START: {
            target: "search",
            actions: "imprimirInicio",
          },
        },
      },
      search: {
        entry: "imprimirEntrada",
        exit: "imprimirSalida",
        on: {
          CONTINUE: "passengers",
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
