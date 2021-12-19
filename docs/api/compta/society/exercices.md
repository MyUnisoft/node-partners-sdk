# Exercices

## Get all
```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

const options: IDefaultHeaderOptions = {
  accessToken,

  /** Only if you are authenticated with a firm access. */
  societyId: 1234
}

const data: Windev.Society.Exercice[] = await MyUnisfot.compta.society.exercices(options);
```

## Interfaces
- [IDefaultHeaderOptions](../../../interfaces/common.md).

```ts
interface Exercice {
  exercice_id: number;
  start_date: string;
  end_date: string;

  /**Label de l'exercice ( N-1, N, N+1 etc..). */
  label: string;

  result: number;

  /**Chiffre d'affaire sur l'exercice. */
  ca: number;
  closed: boolean;
  duration: number;
  closed_at: null | string;

  /**ID de la personne qui a clotûré l'exercice. */
  closed_by: null | number;

  review_model: {
    label: string;
    id_review_model: number;
  }
}
```