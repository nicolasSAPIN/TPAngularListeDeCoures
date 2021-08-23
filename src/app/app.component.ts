import { Component } from '@angular/core';
import '@fortawesome/fontawesome-free/js/all.js';

@Component({
  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})

export class AppComponent {

  article:string=""; // nom de l'article
  id:number=0; //id utile pour recuperer l'indice de l'article à modifier
  articles:any[] = [];//tableau d'articles
  listeArticles:any[] = []; //tableau d'articles du Local storage

  // isUpdate et isCreate utiles pour afficher soit le boutton ajouter soit le boutton modifier
  //ici c'est onCreate qui sera affiché
  isUpdate:boolean= false;
  isCreate:boolean=true;

  ngOnInit(){ // Au chargement de la page on affiche la liste d'articles recuperée dans le storage
    if (localStorage.listeArticles != undefined){  //Si listeArticles existe dans le localStorage
      this.articles = JSON.parse(localStorage.listeArticles);
    }
  }

  onAjouter():void{  // onAjoute valide l'ajout d'un article dans la liste des articles 
    if (this.article != ""){  // Si l'article n'est pas vide
      this.articles.push(this.article);// Ajout de l'article dans le tableau 'articles'
      this.saveFire(); // Sauvegarde sur le local storage
      this.article="";   // r.a.z de l'input article
    }
  }

  onDelete(i:number):void{// onDelete supprime l'article du tableau articles
    this.articles.splice(i,1); // on enleve l'element ( coresspondant à l'indice i) du tableau articles
    this.saveFire();// Sauvegarde sur le storage
  }

  onEdit(i:number){//onEdit permet de modifier l'article selectionné par son id
    this.article=this.articles[i];// l'input recupere la valeur de l'article a modifier
    this.id=i;  // recup de l'indice i de l'article à modifier, puis transmission par le biais du input hidden (id) avant onUpdate

    // isUpdate et isCreate utiles pour afficher soit le boutton ajouter soit le boutton modifier
    this.isCreate=false;
    this.isUpdate=true;//ici c'est onUpdate qui sera affiché (et également le input hidden)
  }

  onUpdate(i:number){ //onUpdate valide la modification de l'article
    this.articles[i]=this.article;  //on enregistre la modification dans le tableau articles a l'indice i
    // isUpdate et isCreate utiles pour afficher soit le boutton ajouter soit le boutton modifier
    this.isCreate=true;//ici c'est onCreate qui sera re-affiché
    this.isUpdate=false;
    this.saveFire();// Sauvegarde sur le storage
    this.article=""; // r.a.z de l'input article
  }

  saveFire() {// Fonction qui permet la sauvegarde dans le localStorage de chrome
    localStorage.listeArticles = JSON.stringify(this.articles);
     //serialisation du tableau articles pour l'enregister dans listeArticles du local storage (on ne peut enregistrer que des chaines de caracteres)
  }

  onGenerateListe(){ //fonction supplementaire qui génére une liste d'articles pour la demo
    // Remplissage du tableau articles
    this.articles=['Du chocolat','Du cafe','Une bonne caftiere','Un PC qui tourne bien','Un Livre Angular','Un bon formateur','Et tout fonctionne'];
    this.saveFire();// Sauvegarde sur le storage
  }

  onResetListe(){ // fonction supplementaire qui fait un reset de la liste des courses
    this.articles=[];// tableau articles vide
    this.saveFire();// Sauvegarde sur le storage
    
  }
}