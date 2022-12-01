export function STRING_LOCALE_COMPARATOR_FACTORY(numeric_sort = true, reverse = false) {
    reverse = reverse ? -1 : 1;
    return (s1, s2) => {
        if (typeof s1 === "string" && typeof s2 === "string")
            return reverse * s1.localeCompare(s2, undefined, { numeric: numeric_sort });
    }
}

export function DATE_COMPARATOR_FACTORY(ascending = true) {
    ascending = ascending ? 1 : -1;
    return (d1, d2) => {
        return ascending * (Date(d1) - Date(d2));
    }
}