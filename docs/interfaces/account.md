
> [Back to root API](../../README.md#📜-api)

```ts
interface Account {
  /** Internal (postgres incremented) account id */
  account_id: number;

  /** Account number (or class). Example: 411FOOBAR */
  account_number: string;

  /** Account name */
  label: string;
  counterpart_account?: AccountNoCp | null;
}

type AccountNoCp = Except<Account, "counterpart_account">;
```
