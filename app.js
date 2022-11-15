"use strict"

//variable de base
const elements = document.createElement("div")
elements.classList.add("carte")
let click = 0

//animation
let rotate180 = [
    { transform: 'rotateY(0deg)' },
    { transform: 'rotateY(180deg)' }
];

let translate = [
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-10px)' },
    { transform: 'translateY(0px)' }
]

let duration = {
    duration: 500
}

//Création des cartes avec attribution de l'intru
const appendElement = (rep) => {
    const random = Math.floor(Math.random() * (64 - 0) + 0);
    for (var i = 0; i < rep; i++) {
        if (i !== random) {
            const ensemble = document.getElementById('ensemble')
            const elements = document.createElement("div")
            elements.classList.add("carte")
            elements.classList.add("hide")
            ensemble.appendChild(elements)
        } else {
            const ensemble = document.getElementById('ensemble')
            const elements = document.createElement("div")
            elements.classList.add("carte")
            elements.setAttribute('id', 'intru');
            ensemble.appendChild(elements)
            console.log(click)
        }
    }
}
appendElement(64)






//Bonton reset

const btn = document.getElementById('btn')
/*
btn.addEventListener('click', () => {
    const res = document.getElementById('ensemble')
    const overlay = document.getElementById('overlay')
    res.style.pointerEvents = 'all'
    overlay.style.pointerEvents = 'none'
    overlay.style.display = 'none'
    res.innerHTML = ''
    click = 0
    count.innerHTML = '0'
    appendElement(64)
})*/

btn.addEventListener('click', () => {
    location.reload()
})


const change_place_intru = () =>{
    console.log("yes")
    let i = 0
    const intru = document.getElementById('intru')
    intru.classList.add('hide')
    intru.removeAttribute('id')
    const card = document.querySelectorAll(".hide")
    console.log(card.length + "je print")
    let random = Math.floor(Math.random() * (card.length - 0) + 0);
    console.log(random)
    card.forEach(e => {
        if (e.classList.contains("hide")  && i === random){
            e.setAttribute("id", "intru")
        }
        i++
        
    });

}

const myInterval = setInterval(change_place_intru, 4000)

//Détection de click sur une carte
const count = document.querySelector('#count span')
const elem = document.querySelectorAll(".carte")
elem.forEach(el => {
    el.addEventListener('click', () => {
        if (!el.classList.contains('carte_base')) {
            click += 1
            el.animate(rotate180, duration)

        }
        if (el.id === 'intru' || click === 30) {
            const intru = document.getElementById('intru')
            console.log(intru)
            setTimeout(() => intru.classList.add('carte_intru'), 250)
            const sect = document.getElementById('ensemble')
            const overlay = document.getElementById('overlay')
            sect.style.pointerEvents = 'none'
            overlay.style.pointerEvents = 'all'
            clearInterval(myInterval)
            setTimeout(() => {
                const score = document.querySelector('#score span')
                overlay.style.display = 'flex'
                if (click === 30) {
                    score.innerHTML = `${click} <br> Vous avez perdu`
                } else {
                    score.innerHTML = `${click} <br> Vous avez gagner`
                }
            }, 2000)


        } else {
            console.log("no")
            setTimeout(() => {
                el.classList.remove('hide')
                el.classList.add('carte_base')
            }, 250)
        }
        count.innerHTML = `${click}`
    })
})