# gas

## 単体テストの実行

```bash
npx jest
```

## GASへの反映

```bash
npx ts-node -T build.ts && npx clasp push && npx clasp open
```

## package.json 不要なモジュールのチェック

```bash
npx npm-check
```
