let donors = require('./ListaDosMortadelas.json')
const express = require('express')
const app = express()
app.set('json spaces', 4)

sortDonorsByAmount()

app.get('/', function (req, res) {
    //res.send(doadores)    
})

//quando existir uma requisição na rota /doadores executa a funçao de callback
app.get('/doadores', function (request, response) {
    let json = getDonor()
    response.header("Content-Type", 'application/json')
    response.send(json)
})

app.get('/cpf', function (request, response) {
    let data = getDonor()
    response.header("Content-Type", 'text/html')
    response.send(data.cpf)
})

app.get('/nome', function (request, response) {
    let data = getDonor()
    response.header("Content-Type", 'text/html')
    response.send(data.nome)
})

app.get('/pessoa', function (request, response) {
    let data = getDonor()
    let json = {
        nome: data.nome,
        cpf: data.cpf,
    }
    response.header("Content-Type", 'application/json')
    response.send(json)
})

//"/maioresDoadores/5"
app.get('/maioresDoadores/:num', function (request, response) {
    let num = parseInt(request.params.num)
    response.header("Content-Type", 'application/json')
    response.send(getGreatestDonors(num))
})

app.get('/total', function (request, response) {
    let total = 0
    donors.map((donor) => {
        total += parseInt(donor.valor)
    })
    response.send('' +  total)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

function getDonor() {
    let index = Math.floor(Math.random() * donors.length)
    let donor = donors[index]
    return donor
}

function sortDonorsByAmount() {
    //previous = anterior, current = atual
    donors.sort(function (previous, current) {
        let valor1 = parseInt(previous.valor)
        let valor2 = parseInt(current.valor)
        if (valor1 > valor2) {
            return -1
        }
        else if (valor1 < valor2) {
            return 1
        }
        else return 0

    })
}

function getGreatestDonors(num) {
    return donors.slice(0, num)
}