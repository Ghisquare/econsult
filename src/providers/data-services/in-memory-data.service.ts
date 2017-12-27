import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemDataService implements InMemoryDbService {
  createDb() {
    const consultations = [
      {"date_creation":1508871206366, "sex":"0","age":101,"description":"Le patient a mal au genou suite à une chute dans les escaliers","antecedent":"diabète","traitementEnCours":"insuline","debut_symptome":"10","debut_symptome_unit":"0","author_id":1,"author":{"id":1,"name":"Larré","forname":"Guillaume","email":"gl@gl.com","pwd":"gl","specialty_id":19,"online":true,"user_type":2,"tel":"+590690362206","skype":"karen.helouet"},"contact_id":"1","contact":{"id":1,"name":"Larré","forname":"Guillaume","email":"gl@gl.com","pwd":"gl","specialty_id":19,"online":true,"user_type":2,"tel":"+590690362206","skype":"karen.helouet"},"xchangeStatus":0,"is_anonymous":false,"patient_id":2,"patient":{"name":"Dupont","forname":"Gérard","birthdate":"1975-09-02","sex":"0","identification":"175027517502898","id":2},"id":4},
      {"date_creation":1508871006366, "sex":"0","age":101,"description":"Le patient a mal au genou suite à une chute dans les escaliers","antecedent":"diabète","traitementEnCours":"insuline","debut_symptome":"10","debut_symptome_unit":"0","author_id":2,"author":{"id":2,"name":"Barreau","forname":"Germain","email":"gb@gb.com","pwd":"gb","specialty_id":26,"online":true,"user_type":2, "tel": "+33610925543", "skype":"germainbarreau"},"contact_id":"2","contact":{"id":2,"name":"Barreau","forname":"Germain","email":"gb@gb.com","pwd":"gb","specialty_id":26,"online":true,"user_type":2, "tel": "+33610925543", "skype":"germainbarreau"},"xchangeStatus":0,"is_anonymous":false,"patient_id":2,"patient":{"name":"Dupont","forname":"Gérard","birthdate":"1975-09-02","sex":"0","identification":"175027517502898","id":2},"id":5},
      {"date_creation":1508870206366,"sex":"0","age":"25","description":"Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. ","antecedent":"Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. ","traitementEnCours":"Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. Texte long pour voir affichage. ","debut_symptome":"4","debut_symptome_unit":"1","author_id":2,"author":{"id":2,"name":"Barreau","forname":"Germain","email":"gb@gb.com","pwd":"gb","specialty_id":26,"online":true,"user_type":2,"tel":"+33610925543","skype":"germainbarreau"},"contact_id":"2","contact":{"id":2,"name":"Barreau","forname":"Germain","email":"gb@gb.com","pwd":"gb","specialty_id":26,"online":true,"user_type":2,"tel":"+33610925543","skype":"germainbarreau"},"xchangeStatus":0,"is_anonymous":"","patient_id":null,"patient":null,"id":6},
      {"date_creation":1514304338887,"sex":"0","age":"55","description":"test","antecedent":"","traitementEnCours":"","debut_symptome":"0","debut_symptome_unit":"0","author_id":1,"author":{"id":1,"civility":"0","name":"Larré","forname":"Guillaume","email":"gl@gl.com","pwd":"gl","specialty_id":19,"online":true,"user_type":2,"tel":"+590690362206","skype":"karen.helouet","shortName":"M. Larré","sex":"0","birthdate":null,"identification":"15645645654","accept_patient":true,"facetime":null,"profession_id":null,"profession":null,"specialty":{"id":19,"name":"Médecine générale"}},"contact_id":"1","contact":{"id":1,"civility":"0","name":"Larré","forname":"Guillaume","email":"gl@gl.com","pwd":"gl","specialty_id":19,"online":true,"user_type":2,"tel":"+590690362206","skype":"karen.helouet","shortName":"Dr. Larré","sex":"0","birthdate":null,"identification":"15645645654","accept_patient":true,"facetime":null,"profession_id":null,"profession":null,"specialty":{"id":19,"name":"Médecine générale"}},"xchangeStatus":0,"is_anonymous":true,"patient_id":null,"patient":null,"id":8},
      {"date_creation":1514306211666,"sex":"0","age":"15","description":"mal de tête","antecedent":"","traitementEnCours":"","debut_symptome":"01","debut_symptome_unit":"0","author_id":1,"author":{"id":1,"civility":"0","name":"Larré","forname":"Guillaume","email":"gl@gl.com","pwd":"gl","specialty_id":19,"online":true,"user_type":2,"tel":"+590690362206","skype":"karen.helouet","shortName":"M. Larré","sex":"0","birthdate":null,"identification":"15645645654","accept_patient":true,"facetime":null,"profession_id":null,"profession":null,"specialty":{"id":19,"name":"Médecine générale"}},"contact_id":"1","contact":{"id":1,"civility":"0","name":"Larré","forname":"Guillaume","email":"gl@gl.com","pwd":"gl","specialty_id":19,"online":true,"user_type":2,"tel":"+590690362206","skype":"karen.helouet","shortName":"Dr. Larré","sex":"0","birthdate":null,"identification":"15645645654","accept_patient":true,"facetime":null,"profession_id":null,"profession":null,"specialty":{"id":19,"name":"Médecine générale"}},"xchangeStatus":3,"is_anonymous":true,"patient_id":null,"patient":null,"id":9,"date_response":1514306250228,"response":"coupez lui la tête","treatment":"","rdvStatus":"0"},
      {"date_creation":1514306364895,"sex":"0","age":"25","description":"mal à la jambe","antecedent":"","traitementEnCours":"","debut_symptome":"03","debut_symptome_unit":"0","author_id":1,"author":{"id":1,"civility":"0","name":"Larré","forname":"Guillaume","email":"gl@gl.com","pwd":"gl","specialty_id":19,"online":true,"user_type":2,"tel":"+590690362206","skype":"karen.helouet","shortName":"M. Larré","sex":"0","birthdate":null,"identification":"15645645654","accept_patient":true,"facetime":null,"profession_id":null,"profession":null,"specialty":{"id":19,"name":"Médecine générale"}},"contact_id":"1","contact":{"id":1,"civility":"0","name":"Larré","forname":"Guillaume","email":"gl@gl.com","pwd":"gl","specialty_id":19,"online":true,"user_type":2,"tel":"+590690362206","skype":"karen.helouet","shortName":"Dr. Larré","sex":"0","birthdate":null,"identification":"15645645654","accept_patient":true,"facetime":null,"profession_id":null,"profession":null,"specialty":{"id":19,"name":"Médecine générale"}},"xchangeStatus":3,"is_anonymous":true,"patient_id":null,"patient":null,"id":10,"date_response":1514306404170,"response":"coupez lui la jambe","treatment":"aspirine","rdvStatus":"1","rdvUnit":"0"}
    ];
    const users = [
      {"id":1,"civility":"0", visible: 2,"name":"Larré","forname":"Guillaume","email":"gl@gl.com","pwd":"gl","specialty_id":19,"online":true,"user_type":2,"tel":"+590690362206","skype":"karen.helouet","shortName":"Dr. Larré","sex":"0","birthdate":null,"identification":"15645645654","accept_patient":true,"facetime":null,"profession_id":null,"profession":null,"specialty":{"id":19,"name":"Médecine générale"}},
      {"id":2,"civility":"0", visible: 2,"name":"Barreau","forname":"Germain","email":"gb@gb.com","pwd":"gb","specialty_id":26,"online":true,"user_type":2,"tel":"+33610925543","skype":"germainbarreau","shortName":"Dr. Barreau","sex":"0","birthdate":null,"identification":"1543629874","accept_patient":true,"facetime":null,"profession_id":null,"profession":null},
      { id: 3, civility: 4, visible: 2, name: 'Lecoeur', forname: 'Benoit',  email: 'lb@lb.com', pwd: 'lb', specialty_id: 3, online: true, user_type: 2, tel: "+590690362206", skype:"giyomgi"   },
      { id: 4, civility: 3, visible: 2, name: 'Aloeil', forname: 'Gaëtan', email: 'ga@ga.com', pwd: 'ga', specialty_id: 26, online: false, user_type: 2, tel: "+590690362206", skype:"giyomgi" },
      { id: 5, civility: 4, visible: 2, name: 'Toubon', forname: 'Gérard', email: 'gt@gt.com', pwd: 'gt', specialty_id: 19, online: false, user_type: 2, tel: "+590690362206", skype:"giyomgi" },
      { id: 6, civility: 3, visible: 2, name: 'Lartere', forname: 'Georges', email: 'gla@gla.com', pwd: 'gla', specialty_id: 3, online: false, user_type: 2, tel: "+590690362206", skype:"giyomgi" },
    ];
    const specialties = [
//      {id : 1, name: 'Allergologue'},
//      {id : 2, name: 'Anesthésiste'},
      {id : 3, name: 'Cardiologue'},
      {id : 19, name: 'Médecine générale'},
      {id : 26, name: 'Ophtalmologue'},
 /*     {id : 4, name: 'Chirurgien cardiaque'},
      {id : 5, name: 'Chirurgie esthétique / réparatrice'},
      {id : 6, name: 'Chirurgie générale'},
      {id : 7, name: 'Chirurgie maxillo-faciale'},
      {id : 8, name: 'Chirurgie pédiatrique'},
      {id : 9, name: 'Chirurgie vasculaire'},
      {id : 10, name: 'Chirurgie thoracique'},
      {id : 11, name: 'Neurochirurgie'},
      {id : 12, name: 'Dermatologue'},
      {id : 13, name: 'Endocrinologue'},
      {id : 14, name: 'Gastro-entérologues'},
      {id : 15, name: 'Gériatre'},
      {id : 16, name: 'Gynécologue'},
      {id : 17, name: 'Infectiologue'},
      {id : 18, name: 'Médecine travail'},
      {id : 20, name: 'Médecine interne'},
      {id : 21, name: 'Médecine nue claire'},
      {id : 22, name: 'Néphrologue'},
      {id : 23, name: 'Neurologue'},
      {id : 24, name: 'Oncologue'},
      {id : 25, name: 'Gynécos obstétrique'},
      {id : 27, name: 'Orthopédie'},
      {id : 28, name: 'O.R.L.'},
      {id : 29, name: 'Pédiatrie'},
      {id : 30, name: 'Pneumologue'},B
      {id : 31, name: 'Psychiatrie'},
      {id : 32, name: 'Radiologie'},
      {id : 33, name: 'Rhumatologie'},
      {id : 34, name: 'Urologie'},
*/
    ];

    const professions = [
      {id : 1, name: 'Infirmier'},
      {id : 2, name: 'Pompier'},
      {id : 3, name: 'Kynésithérapeute'},
    ]

    const patients = [
      {id : 1, name: 'Landa', forname:'Mikel', birthdate:'', sex:0, identification:'177026410206487'},
      {"name":"Dupont","forname":"Gérard","birthdate":"1975-09-02","sex":"0","identification":"175027517502898","id":2},

    ]

    const messages = [];

    const images = [
//      {"uri":"1508598479095.jpg","description":"Paume de la main","consultation_id":4,"id":2},
//      {"uri":"1508598479095.jpg","description":"Paume de la main","consultation_id":5,"id":2},
//      {"uri":"1508598495724.jpg","description":"Dos de la main","consultation_id":4,"id":3},
//      {"uri":"1508598495724.jpg","description":"Dos de la main","consultation_id":5,"id":3}
    ];

    return {consultations, users, specialties, professions, patients, images, messages};
  }
}
