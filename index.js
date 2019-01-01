function Laatikko(id) {
    this.id = id
    this.hasKultaharkko = false
    this.isValittu = false
    this.isOpen = false
    this.hasBeenValittu = 0
    this.valitse = function () {
        this.isValittu = true
        this.hasBeenValittu++
    }
    this.putKultaharkko = function () {
        this.hasKultaharkko = true
    }
}

const laatikot = [new Laatikko(1), new Laatikko(2), new Laatikko(3)]

function randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

function resetLaatikot() {
    laatikot.forEach((laatikko) => {
        laatikko.hasKultaharkko = false
        laatikko.isValittu = false
        laatikko.isOpen = false
    })
    return
}

function openUnselectedLaatikko() {
    laatikot.forEach((laatikko) => {
        if (!laatikko.isValittu && !laatikko.hasKultaharkko) {
            laatikko.isOpen = true
        }
    })
}

function hasSelectedLaatikkoKultaharkko(selectedLaatikko) {
    return selectedLaatikko[0].hasKultaharkko
}

function changeSelectedLaatikko() {
    laatikot.forEach(laatikko => {
        if (!laatikko.isOpen && !laatikko.isValittu) {
            laatikko.valitse()
        } else laatikko.isValittu = laatikko.isValittu
    })
}

function main(timesTorun) {
    const howMany = document.getElementById('input').value
    const toChangeOrNotToChange = document.getElementById('selection').checked

    selectedLaatikkoHasHarkkoCounter = 0
    selectedLaatikkoHasNoHarkkoCounter = 0
    for (let i = 0; i < howMany; i++) {
        laatikot[randomNumber(3)].valitse()
        laatikot[randomNumber(3)].putKultaharkko()

        openUnselectedLaatikko()
        if (toChangeOrNotToChange) {
            changeSelectedLaatikko()
        }

        if (hasSelectedLaatikkoKultaharkko(laatikot.filter((laatikko) => laatikko.isValittu))) {
            selectedLaatikkoHasHarkkoCounter++
        } else selectedLaatikkoHasNoHarkkoCounter++

        resetLaatikot()
    }
    document.getElementById('won').innerHTML = `Number of times won: ${selectedLaatikkoHasHarkkoCounter}`
    document.getElementById('lost').innerHTML = `Number of times lost: ${selectedLaatikkoHasNoHarkkoCounter}`
    console.log(laatikot)
    console.log('valitussa laatikossa oli harkko: ', selectedLaatikkoHasHarkkoCounter)
    console.log('valitussa laatikossa ei ollut harkkoa: ', selectedLaatikkoHasNoHarkkoCounter)
}