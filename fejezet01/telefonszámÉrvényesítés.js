// függvény annak ellenőrzésére, hogy a telefonszám érvényes 11 számjegyű telefonszám-e
// true értéket ad vissza, ha igen, false értéket, ha nem

export function telefonszámÉrvényesítésŰ(telefonszám) {
    // ellenőrizzük, hogy a telefonszám szting-e
    if (typeof telefonszám !== 'string') {
        return false;
    }

    // ellenőrizzük, hogy a telefonszám 11 számjegyű-e
    if (telefonszám.length !== 11) {
        return false;
    }

    // ellenőrizzük, hogy a telefonszám csak számjegyeket tartalmaz-e
    if (!/^\d+$/.test(telefonszám)) {
        return false;
    }

    // ha minden ellenőrzés sikeres, true értéket adunk vissza
    return true;
}