# Society info

[<-- Back](../../../../README.md)

## Get society info
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IGetInfoOptions = {
  accessToken,
  societyId: 1234
};

const data: Windev.Society.Company = await MyUnisfot.compta.society.getInfo(options);
```

## Interfaces

```ts
type getInfo = (options: IGetInfoOptions) => Promise<Company>;

interface IGetInfoOptions {
  accessToken: string;
  societyId: number;
}

interface Company extends CompanyInfo {

  /**Code [APE](https://www.insee.fr/fr/information/2406147). */
  ape: CommonField | null;

  register: CommonField | null;

  /**Statut juridique */
  legal_form: null | {
    id: number;
    label: string;
    code: string;
  };

  road_type: CommonField | null;
  owner_company: CommonField;
  bilan: null;
  impot: null;

  /**Régime TVA */
  vat_regime: CommonField | null;

  footer: null;
  city: Omit<CommonField, "id">;
  comment: string;
  society_id: number;
  name: string;
  siret: string;
  activity: string;

  /**Code Référence d'Obligation Fiscale (ROF) de la TVA.  */
  rof_tva: string;

  /**Code Référence d'Obligation Fiscale (ROF) Transfert des Données Fiscales et Comptables (TDFC). */
  rof_tdfc: string;

  /**Code Référence d'Obligation Fiscale (ROF) de Cotisation Fonciere des Entreprise (CFE). */
  rof_cfe: string

  /**Code Référence d'Obligation Fiscale (ROF) de la Cotisation sur la Valeur Ajoutée des Entreprises (CVAE). */
  rof_cvae: string;

  address_number: string;

  /**Identifiant de l'expert comptable de la société. */
  id_accountant: number | null;
  accountant: PhysicalPerson;

  /**Identitfiant du responsable de mission de la société. */
  id_rm: number | null;
  rm: PhysicalPerson | null;

  id_collab: number | null;
  collab: PhysicalPerson | null;

  adherent_code: string;
  logo: Logo | null;

  id_centre_gestion: number | null;

  /**Code du régime d'imposition. */
  code_sheet_group: string;

  /**Date d'immatriculation. */
  registration_date: string;

  /**Clotûre automatique des écritures lors de l'envoi de la TVA. */
  close_entries_VAT: boolean;

  axe: CommonField | null;

  formule_code: string;
}

interface CommonField {
  id: number;
  label: string;
  value: string;
}

interface PhysicalPerson {
  id_ex: number;
  prenom: string;
  nom: string;
}

interface Logo {
  id: number;
  token: string;
  label: string;
  link: string;
  thumbnail: string;
  download: string;
  baseURL: string;
}

interface CompanyInfo {
  name: string;

  /**??? */
  step: string;

  siret: string | null;

  status: string;

  /**Adresse complète. */
  address: string;

  capital: number;
  country: string;

  /**Permet de savoir si la société possède un mot de passe. */
  secured: boolean;

  /**Permet de savoir s'il y a de l'analytique sur le projet. */
  analytics: boolean;

  member_id: number;

  /**Complément d'adresse. */
  complement: string | null;


  coordonnee: Coordonnee[];
  society_id: number;
  address_bis: string | null;
  companyType: string;

  /**Adresse mail de contact pour les liasses. */
  mail_liasse: string | null;

  postal_code: string;

  /**Option coffre fort. */
  safe_status: boolean;

  /**Numéro d'adresse de la société. */
  street_name: string;

  id_type_company: number;
  folder_reference: string;

  /**Code [Insee](https://fr.wikipedia.org/wiki/Code_Insee). */
  insee: string;
  
  enable_quantity: boolean;
}
```

[<-- Back](../../../../README.md)
