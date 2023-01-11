import { Coordinates } from "./Coordinates";

 export class Token {

    private point: number;
    private key: string;
    private image: string;


  
    constructor(point: number, key: string,image: string) {
      this.point = point;
      this.image = image;
      this.key=key;

    }

    public get getPoint(): number {
        return this.point;
    }

    public set setPoint(value: number){
        this.point = value;
    }

    public get getKey(): String {
        return this.key;
    }

    public set setKey(key: string){
        this.key = key;
    }

    public get  getImage(): string {
        return this.image;
    }

    public set setImage(image: string){
        this.image = image;
    }
    



   
  }
  