import { writeAllSync } from "https://deno.land/std/streams/conversion.ts";
import { allWords, getRndInteger, checkWord } from "./words.ts";

const numberOfTurns = 6;
let todaysWord = "raise";
let todaysWordArray = todaysWord.split("");

while (true) {
    const idx = getRndInteger(0, allWords.length);
    const tempWord = allWords[idx].toLowerCase();
    if (checkWord(tempWord)) {
        todaysWord = tempWord;
        todaysWordArray = tempWord.split("");
        break;
    }
}

let winFlag = 0;

console.log("WORDLE\n\n");
console.log("X -> letter is not present");
console.log("0 -> letter is present and at the right position");
console.log("| -> letter is present but at the wrong position\n\n");

function printf(text: string) {
    const encodeText = new TextEncoder().encode(text);
    writeAllSync(Deno.stdout, encodeText);
}

for (let idx = 0; idx < numberOfTurns; idx++) {
    let correctWords = 0;
    const userInput: string = prompt("Enter word:") as string;
    const userInputArray = userInput.split('');
    for (let i = 0; i < userInputArray.length; ++i) {
        printf(userInputArray[i]);
        printf(" ");

    }
    console.log();
    for (let arrayIdx = 0; arrayIdx < todaysWordArray.length; arrayIdx++) {
        if (todaysWordArray[arrayIdx] == userInputArray[arrayIdx]) {
            printf("0 ");
            correctWords++;
        } 
        else {
            if (todaysWord.includes(userInputArray[arrayIdx]))  {
                if (userInput.slice(0, arrayIdx).includes(userInputArray[arrayIdx])) printf("X ");
                else printf("| ");
            }
            else printf("X ");
        }
    }
    console.log();
    if (correctWords == 5) {
        winFlag = 1;
        break;
    }
}

if (winFlag == 1) {
    console.log("YOU WIN");
}
