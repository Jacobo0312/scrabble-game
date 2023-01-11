 export class Coordinates{
    private x:number;
    private y:number;


    constructor (y:number,x:number){
        this.x=x;
        this.y=y;
    }



    public get getX(): number {
        return this.x;
    }

    public set setX(value: number){
         this.x = value;
    }

    public get getY(): number {
        return this.y;
    }

    public set setY(value: number) {
        this.y = value;
    }



    public isClose(coordinates:Coordinates):boolean{

        let isClose=false;

        if (Math.abs(this.getX-coordinates.getX) <50 ) {
            if (Math.abs(this.getY-coordinates.getY) <50){
                isClose=true;
            }
        }


        return isClose;
    }


    public equals(coordinates:Coordinates):boolean{

        let equals=false;

        if (this.getX==coordinates.getX && this.getY==coordinates.getY  ) {
           equals=true;
        }


        return equals;
    }
    

}