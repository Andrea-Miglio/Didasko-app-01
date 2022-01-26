export class Persona {
  id:number;
  nome:string;
  cognome:string|undefined;
  sesso:boolean;
  sessoStr:string;
  constructor(id:number, nome:string, cognome:string, sesso:boolean) {
      this.id=id;
      this.nome=nome;
      this.cognome=cognome;
      this.sesso=sesso;
      if(sesso){
          this.sessoStr="Maschio"
      } else{
          this.sessoStr="Femmina"
      }
  }

  setSesso(sesso:boolean){
      this.sesso=sesso;
      if(sesso){
          this.sessoStr="Maschio";
      } else{
          this.sessoStr="Femmina";
      } 
  }
}