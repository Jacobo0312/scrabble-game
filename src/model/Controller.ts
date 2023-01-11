import { Coordinates } from "./Coordinates";
import { Token } from "./Token";
import { Word } from "./Word";




export class Controller {

    private tablePositions: Coordinates[];
    private tableWords: Coordinates[];
    private tokens: Token[];
    private score: number;
    private words: Word[];
    private tokensWord: Token[];
    private tokensOut: Token[];
    private listWords: string[] = require('./words.json');
    private counter: number = 1;
    private word: string = "";
    private bonus:number=1;



    constructor() {
        this.tablePositions = [new Coordinates(603, 573), new Coordinates(603, 663), new Coordinates(603, 753), new Coordinates(603, 843), new Coordinates(603, 933), new Coordinates(603, 1023), new Coordinates(603, 1113)];
        this.tableWords = [new Coordinates(390, 127), new Coordinates(390, 234), new Coordinates(390, 341), new Coordinates(390, 448), new Coordinates(390, 555), new Coordinates(390, 662), new Coordinates(390, 769)];
        this.tokens = new Array();
        this.score = 0;
        this.tokensWord = new Array();
        this.words = new Array();

        for (let index = 0; index < 7; index++) {
            this.tokensWord[index] = new Token(0, "", "");

        }

        this.tokensOut = new Array();
        for (let index = 0; index < 7; index++) {
            this.tokensOut[index] = new Token(0, "", "");

        }

        this.generateTokens();
        this.takeOutTokens();

    }

    public sendWord(): string {

        let word = this.word;
        let points = 0;


        if (word != "") {

            for (let index = 0; index < 7; index++) {
                points += this.tokensWord[index].getPoint;
                this.tokensWord[index] = new Token(0, "", "");

            }

            this.takeOutTokens();
        }

        if (word.length >= 6){
            this.bonus=1.5;
        }else if (this.bonus!=1.5 && word.length <=5){
            this.bonus=0.5;
        }

        this.score += points*this.bonus;
        
        this.words.push(new Word(points, word, word.length, this.counter));
        this.counter++;

        return word;

    }


    public getWord(): string {
        let word = "";
        this.tokensWord.forEach((element) => {
            word += element.getKey;
        })

        return word;
    }

    public get getBonus(): string {

        return this.bonus.toString();
    }




    public changeToken(coordinates: Coordinates, init: Coordinates): Coordinates {


        let isClose = coordinates.isClose(init);
        
        let coordinatesFinal: Coordinates = init
        console.log(coordinatesFinal)
        let token = this.searchToken(init);

        let list:Token[];

        if (token[1] == 1) {
            list = this.tokensWord;
        } else {
            list = this.tokensOut;

        }

        for (let index = 0; index < this.tableWords.length && !isClose; index++) {
            const element = this.tableWords[index];
            isClose = element.isClose(coordinates);

            if (isClose && this.tokensWord[index].getKey=="") {

                coordinatesFinal = this.tableWords[index];

                this.tokensWord[index] = list[token[0]];
                list[token[0]] = new Token(0, "", "");

            }


        }

            for (let index = 0; index < this.tablePositions.length && !isClose; index++) {
                const element = this.tablePositions[index];
                isClose = element.isClose(coordinates);

                if (isClose && this.tokensOut[index].getKey=="") {

                    coordinatesFinal = this.tablePositions[index];
                    this.tokensOut[index] = list[token[0]];
                    list[token[0]] = new Token(0, "", "");
                }  

            }
        



            console.log(coordinatesFinal)
        return coordinatesFinal;

    }



    generateTokens(): void {

        this.tokens.push(new Token(10, "Z", "./assets/Z.svg"));
        this.tokens.push(new Token(4, "Y", "./assets/Y.svg"));
        this.tokens.push(new Token(6, "J", "./assets/J.svg"));
        this.tokens.push(new Token(8, "LL", "./assets/LL.svg"));
        this.tokens.push(new Token(8, "Ñ", "./assets/Ñ.svg"));
        this.tokens.push(new Token(5, "Q", "./assets/Q.svg"));
        this.tokens.push(new Token(8, "RR", "./assets/RR.svg"));
        this.tokens.push(new Token(8, "X", "./assets/X.svg"));
        this.tokens.push(new Token(4, "F", "./assets/F.svg"));
        this.tokens.push(new Token(5, "CH", "./assets/CH.svg"));


        for (let index = 0; index < 2; index++) {

            this.tokens.push(new Token(0, "_", "./assets/COMODIN.svg"));
            this.tokens.push(new Token(3, "P", "./assets/P.svg"));
            this.tokens.push(new Token(3, "M", "./assets/M.svg"));
            this.tokens.push(new Token(4, "H", "./assets/H.svg"));
            this.tokens.push(new Token(4, "V", "./assets/V.svg"));
            this.tokens.push(new Token(2, "G", "./assets/G.svg"));
            this.tokens.push(new Token(3, "B", "./assets/B.svg"));
        }



        for (let index = 0; index < 12; index++) {
            this.tokens.push(new Token(1, "A", "./assets/A.svg"));
            this.tokens.push(new Token(1, "E", "./assets/E.svg"));
        }


        for (let index = 0; index < 4; index++) {
            this.tokens.push(new Token(1, "L", "./assets/L.svg"));

            this.tokens.push(new Token(1, "T", "./assets/T.svg"));
            this.tokens.push(new Token(1, "C", "./assets/C.svg"));


        }



        for (let index = 0; index < 5; index++) {
            this.tokens.push(new Token(1, "N", "./assets/N.svg"));
            this.tokens.push(new Token(1, "D", "./assets/D.svg"));
            this.tokens.push(new Token(1, "R", "./assets/R.svg"));
            this.tokens.push(new Token(1, "U", "./assets/U.svg"));

        }



        for (let index = 0; index < 6; index++) {
            this.tokens.push(new Token(1, "I", "./assets/I.svg"));
            this.tokens.push(new Token(1, "S", "./assets/S.svg"));

        }



        for (let index = 0; index < 8; index++) {
            this.tokens.push(new Token(1, "O", "./assets/O.svg"));
        }

    }


    public takeOutTokens(): Token[] {


        if (this.tokens.length >= 7) {


            for (let i = 0; i < 7; i++) {

                if (this.tokensOut[i].getKey == "") {

                    this.tokens.sort(() => Math.random() - 0.5);

                    let token = this.tokens[this.tokens.length - 1];

                    this.tokensOut[i] = token;
                    this.tokens.pop()
                }


            }
        }


        return this.tokensOut;

    }





    public get getTablePositions(): Coordinates[] {
        return this.tablePositions;
    }

    public get getTableWords(): Coordinates[] {
        return this.tableWords;
    }


    public get getTokens(): Token[] {
        return this.tokens;
    }


    public get getScore(): number {
        return this.score;
    }


    public get getWords(): Word[] {

        return this.words;
    }


    public set setTablePositions(value: Coordinates[]) {
        this.tablePositions = value;
    }


    public set setTokens(value: Token[]) {
        this.tokens = value;
    }


    public set setScore(value: number) {
        this.score = value;
    }




    public searchToken(init: Coordinates): number[] {

        let find = false;
        let token = 0;
        let list = 0;

        for (let index = 0; index < this.tableWords.length && !find; index++) {

            if (this.tableWords[index].equals(init)) {
                find = true;
                token = index;
                list = 1;
            }

        }


        for (let index = 0; index < this.tablePositions.length && !find; index++) {
            if (this.tablePositions[index].equals(init)) {
                find = true;
                token = index;
                list = 2;
            }

        }

        let array = [token, list];

        return array;
    }



    public get getTokensWord(): Token[] {
        return this.tokensWord;
    }


    public set setTokensWord(value: Token[]) {
        this.tokensWord = value;
    }



    public get getTokensOut(): Token[] {
        return this.tokensOut;
    }


    public set setTokensOut(value: Token[]) {
        this.tokensOut = value;
    }


    public validateWord(): boolean {


        this.word = this.getWord().toLowerCase();;


        if (this.word.includes("_")) {
            //Twice because in the game it is possible for two comodines cards to appear at the same time.
            this.word = this.word.replace("_", "[a-z]");
            this.word = this.word.replace("_", "[a-z]");

            const regex: RegExp = new RegExp("\\b" + this.word + "\\b");
            let find = false;

            for (let index = 0; index < this.listWords.length && !find; index++) {
                const element = this.listWords[index];
                if (regex.test(element)) {
                    this.word = element;
                    find = true;
                }

            }

            return find;

        } else {
            return this.listWords.includes(this.word);
        }


    }


    public sortWords(parameter: string) {

        if (parameter == "length") {
            this.getWords.sort((a, b) => b.getSize - a.getSize);
        } else if (parameter == "points") {
            this.getWords.sort((a, b) => b.getPoints - a.getPoints);
        } else {
            this.getWords.sort((a, b) => a.getTime - b.getTime);
        }

    }

}



