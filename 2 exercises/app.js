class Note{
    constructor(id,descripcion,status = false){
        this.id = id 
        this.descripcion = descripcion 
        this.status = status
    }
    toggleStatus(){
        this.status = !this.status
    }

}