let json = []

let proCer = ["name","alcohol","style","ibu","blg","brand","yeast","malts"]
let cabeCer = ["Nome", "Álcool", "Estilo", "Amargor","Escala Bailing","Marca","Levedura","Maltes"]

let proCaf = ['blend_name','origin','variety','notes','intensifier']
let cabeCaf = ['Nome','Origem','Variedade','Notas','Intensificador']

let proComi = ['dish','description','ingredient','measurement']
let cabeComi = ['Prato','Descrição','Ingrediente','Medida']

let apis = [
    {beer: "https://random-data-api.com/api/v2/beers?size=3"},
    {coffe: "https://random-data-api.com/api/coffee/random_coffee?size=3"},
    {foods: "https://random-data-api.com/api/food/random_food?size=3"}
]

const carregarDiv = (div_nome,json,cabecalho,propriedade,titulo) => {
    const div = document.getElementById(div_nome)

    const itensHtml = json.map(item => 
        `<tr>
            ${propriedade.map(p => 
                `<td>${item[p]}</td>`
            ).join("")}
        </tr>`
    )          

    const itensCabe = cabecalho.map(cabe => `<th>${cabe}</th>`)
    div.innerHTML = 
    `<h2 style="text-align:center; color: rgb(216, 29, 70);">${titulo}</h2>
    <table>
        <tr>
            ${itensCabe.join("\n")}
        </tr>
        ${itensHtml.join("\n")}
    </table>`
    
}   

async function carregar(api,div_nome,json,cabecalho,propriedade,titulo){
    try{
        let res = await fetch(api)
        json = await res.json()
        carregarDiv(div_nome,json,cabecalho,propriedade,titulo)
    }catch(err){
        document.getElementById(div_nome).innerHTML = "Fudeu..."
    }
}

let cervejar = document.getElementById("cervejar")
cervejar.addEventListener("click", () => carregar(apis[0]['beer'],"div-table",json,cabeCer,proCer,"Carregando Cervejas"))

let cafer = document.getElementById("cafer")
cafer.addEventListener("click", () => carregar(apis[1]['coffe'],"div-table",json,cabeCaf,proCaf,"Carregando Cafés"))

let comidar = document.getElementById("comidar")
comidar.addEventListener("click", () => carregar(apis[2]['foods'],"div-table",json,cabeComi,proComi,"Carregando Comidas"))