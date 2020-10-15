import M from "materialize-css";

export function showError(message) {
  M.toast({ html: message, classes: "#c62828 red darken-3" });
}

export function showSuccess(message) {
  M.toast({ html: message, classes: "#43a047 green darken-1" });
}
