export class Word {

    private points:number;
    private word:string;
    private size:number;
    private time:number;


    constructor(points:number,word:string,size:number,time:number){
        this.points=points;
        this.word=word;
        this.size=size;
        this.time=time;
    }



	public get getPoints(): number {
		return this.points;
	}

	public get getWord(): string {
		return this.word;
	}


	public get getSize(): number {
		return this.size;
	}


    public get getTime(): number {
		return this.time;
	}

	public set setPoints(value: number) {
		this.points = value;
	}


	public set setWord(value: string) {
		this.word = value;
	}


	public set setSize(value: number) {
		this.size = value;
	}

    public set setTime(value: number) {
		this.time = value;
	}


    public toString():string{
        return this.word+": "+this.points
    }


    
}