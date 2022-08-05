export const CONSTANTS = {
  LARAVEL_API: "https://dev.wallet.komuny.social/api",
  LARAVEL_API_LOCAL: "http://komuny.waas.financial/api",

  set base_url (base_url) {
    this.LARAVEL_API = base_url;
  },
};

export const ACCOUNT_ACTIONS = [
  {
    label: "Borrar",
    status: 'DELETED',
    icon: "",
    size: "sm",
    on: { input: (e) => { alert(e) } },
  },
  {
    label: "Freezar",
    status: 'FROZEN',
    icon: "",
    size: "sm",
    on: { input: (e) => { alert(e) } },
  },
  {
    label: "Deshabilitar",
    status: 'DISABLED',
    icon: "",
    size: "sm",
    on: { input: (e) => { alert(e) } },
  },
  {
    label: "Activar",
    status: 'ACTIVE',
    icon: "",
    size: "sm",
    on: { input: (e) => { alert(e) } },
  },
  {
    label: "Crear Tarjeta",
    status: 'NEW_CARD',
    icon: "",
    size: "sm",
    on: { input: (e) => { alert(e) } },
  },
];

export const ACCOUNT_CASH_OPERATION = [
  {
    label: "Retirar",
    type: 'cashout',
    icon: "",
    size: "sm",
  },
  {
    label: "Enviar",
    type: 'send',
    icon: "",
    size: "sm",
  },
  {
    label: "Depositar",
    type: 'cashin',
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
