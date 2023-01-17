const inquirer = require('inquirer');
//import inquirer from 'inquirer';
async function main(){
    try {
        const respuesta = await inquirer.prompt([{
            type:'input',
            name:'apellido',
            message:'Ingresa tu nombre'
        }]);
        console.log(respuesta)
    }catch (error){
        console.error(error)
    }
}

main()