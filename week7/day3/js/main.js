const DOM_Elements = {
    standingsTable: '.standings-table',
    driverStandings: '.driver-standings'
}

const getStandingsTableData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}

const loadStandingsData = async (season, round) => {
    const standings = await getStandingsTableData(season, round)
    const html = `
        <table class="table-auto driver-standings mx-auto w-3/4">
            <thead class="text-right">
                <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Nationality</th>
                    <th>Sponsor</th>
                    <th>Points</th>
                </tr>
            </thead>
        </table>
    `
    document.querySelector(DOM_Elements.standingsTable).insertAdjacentHTML('beforeEnd', html)
    standings.forEach(racer => createTableRows(
        racer.Driver.driverId, racer.position,
        racer.Driver.givenName, racer.Driver.familyName,
        racer.Driver.url, racer.Driver.nationality,
        racer.Constructors[0].name, racer.points
    ))
}

const createTableRows = (id, position, firstName, lastName, wiki, nationality, sponsor, points) => {
    const html = `
        <tbody id=${id} class="table-animation-enter">
            <tr class="text-right">
                <td>${position}</td>
                <td class="text-blue-400"><a href="${wiki}">${firstName} ${lastName}</a></td>
                <td>${nationality}</td>
                <td>${sponsor}</td>
                <td>${points}</td>
                <td><button class="rounded-full-lg bg-rose-500 p-2" onclick="deleteRow('${id}')">DISQUALIFY THIS RACER!</button></td>
            </tr>
        </tbody>
    `
    setTimeout(() => {
        document.getElementById(id).classList.add('table-animation-enter-active');
      }, 0)
    document.querySelector(DOM_Elements.driverStandings).insertAdjacentHTML('beforeEnd', html)
}

document.querySelector('#race-data-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let season = document.querySelector('#race-year').value
    let round = document.querySelector('#race-round').value
    console.log(season, round)
    if (season && round) {
        loadStandingsData(season, round)
    } else {
        console.log('Please fill in both the season and round fields.')
    }
})

const updatePositionNumbers = () => {
    const rows = document.querySelectorAll(DOM_Elements.driverStandings + ' tbody')
    rows.forEach((row, index) => {
        row.querySelector('td:first-child').innerHTML = index + 1
    })
}

const deleteRow = (id) => {
    const row = document.getElementById(id)
    row.classList.add('row-animation-leave')
    row.classList.add('row-animation-leave-active')
    setTimeout(() => {
        row.remove()
        updatePositionNumbers()
    }, 500)
}
