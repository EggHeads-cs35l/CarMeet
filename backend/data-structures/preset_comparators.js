function USERNAME_NUMERIC_ALPHABETICALLY_ORDER(s1, s2) {
    return String(s1).localeCompare(String(s2), undefined, { numeric: true });
}

function USERNAME_ALPHABETICALLY_ORDER_REVERSE(s1, s2) {
    return -String(s1).localeCompare(String(s2));
}

function EMAIL_NUMERIC_ALPHABET_ORDER(e1, e2) {
    return String(e1).localeCompare(String(e2), undefined, { numeric: true })
}
