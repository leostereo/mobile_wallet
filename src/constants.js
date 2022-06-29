export const CONSTANTS = {
  LARAVEL_API: "https://wallet.komuny.social/api",

  set base_url (base_url) {
    this.LARAVEL_API = base_url;
  },
};

export const ACCOUNT_ACTIONS = [
  {
    label: "Borrar",
    icon: "",
    size: "sm",
    on: { input: (e) => { alert(e) } },
  },
  {
    label: "Freezar",
    icon: "",
    size: "sm",
    on: { input: (e) => { alert(e) } },
  },
  {
    label: "Deshabilitar",
    icon: "",
    size: "sm",
    on: { input: (e) => { alert(e) } },
  },
  {
    label: "Activar",
    icon: "",
    size: "sm",
    on: { input: (e) => { alert(e) } },
  },
  {
    label: "Crear Tarjeta",
    icon: "",
    size: "sm",
    on: { input: (e) => { alert(e) } },
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
