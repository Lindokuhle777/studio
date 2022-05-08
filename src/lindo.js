let p = [1,2,3,4,5]
const u = [
    {
        name:"sabelo"
    },
    {
        name:"lindokuhle"
    },
    {
        name:"lindo"
    }
]

for (let i in u){
    if(u[i].name==="sabelo"){
        u[i].age = 7
    }
}

console.log(u)