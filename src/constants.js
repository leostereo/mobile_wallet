export const CONSTANTS = {
  LARAVEL_API: "http://komuny.waas.financial/api",

  set base_url (base_url) {
    this.LARAVEL_API = base_url;
  },
};

export const ACCOUNT_ACTIONS = [
  {
    label: "Activar",
    icon: "",
    size: "sm",
  },
  {
    label: "Bloquear",
    icon: "",
    size: "sm",
  },
  {
    label: "Crear tarjeta",
    icon: "",
    size: "sm",
  },
];

export const ACCOUNT_CASH_OPERATION = [
  {
    label: "Retirar",
    icon: "",
    size: "sm",
  },
  {
    label: "Enviar",
    icon: "",
    size: "sm",
  },
  {
    label: "Depositar",
    icon: "",
    size: "sm",
  },
];


export const CARD_ACTIONS = [
  {
    label: "bloquear",
    icon: "",
    size: "sm",
  },
  {
    label: "activar",
    icon: "",
    size: "sm",
  },
  {
    label: "editar",
    icon: "",
    size: "sm",
  },
];
