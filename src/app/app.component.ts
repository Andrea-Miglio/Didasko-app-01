import { Component, ElementRef, ViewChild } from '@angular/core';
import { Persona } from './Persona';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("idCampo") idCampoElement!:ElementRef;
  @ViewChild("nomeCampo") nomeCampoElement!:ElementRef;
  titolo = 'CRUD';
  nome:string = "";
  stato:boolean=true;
  nomeBis:string="";
  statoBis:boolean=true;
  listaPersone:Persona[] = [];
  persona:Persona;
  personaCorrente:Persona;
  personaCopiata:Persona;
  modifica:boolean=false;
  pulsanti:boolean=false;
  campi:boolean=false;
  attivaInserimento:boolean=false;
  constructor(){
    this.persona=new Persona(0, "", "", true);
    this.personaCorrente=this.persona;
    this.personaCopiata=this.persona;
  }
  aggiornaNome(){
    if(this.stato){
      this.nome="Alessandro";
    } else{
      this.nome="Carla";
    }
    this.stato = !this.stato;
  }

  cancellaNome(){
    this.nome="";
  }

  salvaNome(nome:string){
    this.nome=nome;
  }

  aggiornaNomeBis(){
    if(this.statoBis){
      this.nomeBis="Alessandro";
    } else{
      this.nomeBis="Carla";
    }
    this.statoBis = !this.statoBis;
  }

  cancellaNomeBis(){
    this.nomeBis="";
  }

  aggiornaPersona(){
    this.persona.id=1;
    this.persona.nome="Luca";
    this.persona.cognome="Ienna";
    this.persona.setSesso(true);
  }

  cancellaPersona(){
    this.persona.id=0;
    this.persona.nome="";
    this.persona.cognome="";
    this.persona.setSesso(true);
  }

  aggiungiPersona(){
    if(this.persona.nome!="" && this.persona.cognome!="" && !this.idDuplicato(this.persona.id)){
    if(this.persona.sesso){
      this.persona.sessoStr="Maschio"
    }else{
      this.persona.sessoStr="Femmina"
    }
    this.listaPersone.push(this.persona)
    this.persona=new Persona(0, "", "", true);
    this.personaCorrente=this.persona;
    this.attivaInserimento=false;
    this.pulsanti=false;
  } else if(this.persona.nome=="" || this.persona.cognome==""){
    alert("Il nome ed il cognome sono campi obbligatori!!!")
    this.nomeCampoElement.nativeElement.focus();
  } else{
    alert("ID duplicato!!!")
    this.idCampoElement.nativeElement.focus();
  }
  }

  dettaglioPersona(id:number){
    //alert(id);
    this.pulsanti=true;
    this.campi=true;
    this.persona = this.cercaPersona(id);
  }

  cercaPersona(id:number): Persona{
    var persona!:Persona;
/*
    for (var i = 0; i < this.listaPersone.length; i++) {
        if(this.listaPersone[i].id == id){
          break;
        }
    }
    return this.listaPersone[i];
    
  for(var p of this.listaPersone){
    if(p.id == id){
      break;
    }     
  }
  */
  this.listaPersone.forEach(p=>{
    if(p.id==id){
       persona=p;  
    }
  })
  return persona;
  }

  rimuoviPersona(id:number){
    this.listaPersone.splice(this.listaPersone.indexOf(this.cercaPersona(id)), 1);
  }

  resetPersona(){
    this.pulsanti=false;
    this.campi=false;
    this.attivaInserimento=false;
    this.persona = this.personaCorrente;
    this.persona.id=0;
    this.persona.nome="";
    this.persona.cognome="";
    this.persona.sesso=true;
  }

  modificaPersona(id:number){
    this.modifica=true;
    this.pulsanti=true;
    this.idCampoElement.nativeElement.disabled=true;
    this.persona = this.cercaPersona(id);
    //duplichiamo la persona trovata
    this.personaCopiata = new Persona(0, "", "", true);
    this.personaCopiata.id = this.persona.id;
    this.personaCopiata.nome = this.persona.nome;
    this.personaCopiata.cognome = this.persona.cognome;
    this.personaCopiata.sesso = this.persona.sesso;
    this.personaCopiata.sessoStr = this.persona.sessoStr;
  }

  annullaModificaPersona(){
    this.modifica=false;
    this.pulsanti=false;
    this.attivaInserimento=false;
    this.idCampoElement.nativeElement.disabled=false;
    this.persona.id = this.personaCopiata.id;
    this.persona.nome = this.personaCopiata.nome;
    this.persona.cognome = this.personaCopiata.cognome;
    this.persona.sesso = this.personaCopiata.sesso;
    this.persona.sessoStr = this.personaCopiata.sessoStr;
    this.persona = this.personaCorrente;
  }

  confermaModificaPersona(){
    if(this.persona.nome!="" && this.persona.cognome!=""){
    this.modifica=false;
    this.pulsanti=false;
    this.idCampoElement.nativeElement.disabled=false;
    this.attivaInserimento=false;
    this.persona = this.personaCorrente;
    } else{
      alert("Il nome ed il cognome sono campi obbligatori!!!")
      this.nomeCampoElement.nativeElement.focus();
    }
  }
  attivaPulsanteInserimento(){
    if(this.persona.id>0){
      this.attivaInserimento=true;
      this.pulsanti=true;
    }else{
      this.attivaInserimento=false;
    }
  }
  idDuplicato(id:number):boolean{
    let trovato:boolean=false;
    this.listaPersone.forEach(p=>{
      if(p.id==id){
         trovato=true;  
      }
    })
    return trovato;
  }
}
