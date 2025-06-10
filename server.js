const app = require('express')();
const porta = 7890

app.set("view engine", "ejs")

app.get("/conta", (request,response) => {
    var num = request.query.numero
    num = num*num
    response.send("A area do seu quadrado é: "+num)
})

app.get("/1", (request, response) => {
    response.render("form.ejs")
})


app.listen(porta)