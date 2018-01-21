import * as moment from 'moment';

export function afficheDate(ts: number): string {
  var result =  moment(ts * 1).format("DD/MM/YY HH:mm");
  return result;
}


export function sexText(sexCode: number): string {
    let sexText = ['Masculin', 'Féminin'];
    return sexText[sexCode];
  };

export function getSpecialtyName(id): string{
  var names: any[] = new Array();
  names[4] = 'Cardiologue';
  names[1] = 'Médecine générale';
  names[3] = 'Ophtalmologue';
  return names[id];
}

export const responseStatus = ['Pas de consultation nécessaire',
  'Consultation avant',
  //'Consultation en urgence'
];

export const userTypes = ['Patient',
  'Profession médicale non médecin',
  'Médecin'];

export const civilities = ['M',
  'Mme',
  'Mlle'];

export function age(birthdate: Date) {
  var age: number;
  var today = new Date();
  console.log("functions.age");
  console.log(birthdate);
  var tmpDate = new Date(birthdate);
  console.log(tmpDate);
  console.log("today" + today);
  console.log("birthdate" + birthdate + tmpDate);

  age = today.getFullYear() - tmpDate.getFullYear();                          // Initialisation du retour
    if(today.getMonth()- tmpDate.getMonth() < 0) age = age - 1;
    if((today.getMonth()- tmpDate.getMonth() == 0) && (today.getDay()- tmpDate.getDay() < 0)) age = age - 1;

    return age;
  };

