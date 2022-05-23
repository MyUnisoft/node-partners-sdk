# Grand Livre

[<-- Back](../../../../README.md)

```ts
const options: MyUnisoft.compta.society.IGetGrandLivreOptions = {
  header: {
    accessToken,
    societyId
  },
  params: {
    startDate: "2018-01-01",
    endDate: "2018-12-31"
  }
};

const data = await MyUnisoft.compta.society.getGrandLivre(options);
```

## Interfaces
- [IDefaultOptions](../../../interfaces/common.md)

```ts
type getGrandLivre = (options: IGetGrandLivreOptions) => Promise<any>;

interface IGetGrandLivreOptions extends IDefaultOptions {
  params: {
    /**
     * Format: YYYY-MM-DD
     */
    startDate: string;

    /**
     * Format: YYYY-MM-DD
     */
    endDate: string;
  }
}
```
