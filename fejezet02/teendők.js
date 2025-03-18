/*
1.
Hozz létre egy teendőElemek nevű konstansot, amely egy objektumtömböt tartalmaz.
Minden objektumnak legyen egy teendőSzöveg tulajdonsága és egy elvégzett tulajdonsága.
*/

const teendőElemek = [
    {
        teendőSzöveg: 'bevásárlás',
        elvégzett: false
    },
    {
        teendőSzöveg: 'mosás',
        elvégzett: true
    },
    {
        teendőSzöveg: 'tanulás',
        elvégzett: false
    }

];

/*
2.
Hozz létre egy olyan függvényt, amely megjeleníti a teendőkelemek
Listáját egy olyan elemben, amelynek id attribútuma a "teendők" értékre van állítva a böngészőben.
*/

function megjelenítTeendők() {
    const teendők = document.getElementById('teendők');
    teendők.innerHTML = '';
    teendőElemek.forEach((elem, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="checkbox" ${elem.elvégzett ? 'checked' : ''} id="teendő_${index}">
            <label for="teendő_${index}">${elem.teendőSzöveg}</label>
        `;
        teendők.appendChild(div);
    });
}

