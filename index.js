import inquirer from "inquirer";
import qr from 'qr-image';
import * as fs from 'node:fs';

inquirer
    .prompt([
        {
            type:'input',
            name:'InputURL',
            message:'Type your url: ',
            default:'example: www.google.com'
        }
    ])  
    .then((answers) => {
        var qr_png=qr.image(answers.InputURL);
        qr_png.pipe(fs.createWriteStream('qr_image.png'));

        fs.writeFile("userInput.txt", `User Inputs are: ${answers.InputURL}`, (err) => {
            if (err) throw err;
            console.log('The url has been saved!');
        });
    })
    .catch((error) => {
        if(error.isTtyError){
            throw new Error("Prompt couldn't be render in current environment");
        }
    })
    