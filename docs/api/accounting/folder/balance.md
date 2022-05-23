# Balance

[<-- Back](../../../../README.md)

```ts
import * as MyUnisoft from "@myunisoft/partners-sdk";
import { Windev } from "@myunisoft/tsd";

// By exercices
const options: MyUnisoft.compta.society.IBalanceOptions = {
  header: {
    accessToken,
    societyId
  },
  params: {
    fiscalYearId: 2021,
    axisId: 1234
  }
};

// Or by Date
const options: MyUnisoft.compta.society.IBalanceOptions ={
  header: {
    accessToken,
    societyId
  },
  params: {
    startDate: "20180101",
    endDate: "20181231",
    axisId: 1234
  }
};

const data = await MyUnisoft.compta.society.balance(options);
```

## Interfaces
- [IDefaultOptions](../../../interfaces/common.md).

```ts
type balance = (options: IBalanceOptions) => Promise<any>;

interface IBalanceByExerciceParams {
  /**
   * ID de l’exercice dont on souhaite la balance.
   */
  fiscalYearId: number;

  /**
   * ID de l’axe dont on souhaite la balance.
   */
  axisId: number;

  type?: "compare" | "aged";
}

interface IBalanceByDateParams {
  /**
   * Format: YYYYMMDD
   */
  startDate: string;

  /**
   * Format: YYYYMMDD
   */
  endDate: string;

  /**
   * ID de l’axe dont on souhaite la balance.
   */
  axisId: number;
}

interface IBalanceOptions extends IDefaultOptions {
  params: IBalanceByExerciceParams | IBalanceByDateParams;
}
```

[<-- Back](../../../../README.md)
