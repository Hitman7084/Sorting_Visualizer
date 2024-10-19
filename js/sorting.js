class sortingAlgorithms{
    constructor(time){
        this.list = document.querySelectorAll(".cell")
        this.size = this.list.length;
        this.time = time;
        this.help = new Marker(this.time, this.list);
    }

    BubbleSort = async() => {
        for(let i = 0; i < this.size-1; ++i){
            for(let j = 0; j < this.size-i-1; ++j){
                await this.help.mark(j);
                await this.help.mark(j+1);
                if(await this.help.compare(j, j+1)){
                    await this.help.swap(j, j+1);
                }
                await this.help.unmark(j);
                await this.help.unmark(j+1);
            }
            this.list[this.size-i-1].setAttribute("class", "cell done");
        }
        this.list[0].setAttribute("class", "cell done");
    }
};