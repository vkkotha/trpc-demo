Sample project demonstrating [tRPC](https://trpc.io/docs/quickstart) client, server and [trpc-playground](https://github.com/sachinraja/trpc-playground)

## Getting Started

You can run the tRpc server (source in server folder) by running
```bash
npm run server
```
The serer uses native node.js adapter and demonstrating running tRPC server on it's own with out other server frameworks like express.

You can connect to the server using the client (source in client folder) by running
```bash
npm run client
```

To call the tRPC endpoint (router.procedure) you can follow these steps.

## Invoke Query
Following is example to invoke users.getUserById procedure.
This sample code uses [superjson](https://www.npmjs.com/package/superjson) for serialiation.
1. Prepare payload by using this json
```json
{
  "0": {
    "json": 0
  }
}
```
You should get something like this.
```
%7B%220%22%3A%7B%22json%22%3A0%7D%7D
```
2. urlEncode the json. In postman you can use encodeURIComponet(). You can setup a Postman Pre-request script like this for Query requests. This way you can copy the Json to the body, and pre-request will convert it to query string.
```js
const input = encodeURIComponent(pm.request.body.raw);
pm.request.addQueryParams(`batch=1&input=${input}`);
pm.request.update({
    body: undefined
});
```
3. do a http GET request with
`http://localhost:2023/api/trpc/user.getUserById?batch=1&input=%7B%220%22%3A%7B%22json%22%3A0%7D%7D`

## Invoke Mutation
For this use postman as, you have to do a Http POST request
1. Create new Postman request and set http meotod to **POST** and URL to `http://localhost:2022/user.createUser?batch=1`.
2. Set Content-Type: application/json in Headers
3. In Body use following JSON
```json
{
    "0": {
        "json": {
            "name": "Joe Biden"
        }
    }
}
```

## Run Playground
tRpc playground runs express server with tRpc routes and trpc-playground on same server with endpoints `/api/trpc` and `/trpc-playground`

Using playground you can explore endpoints, procedures and run queries and mutations. Run playground using

```bash
npm rum playground
```

Connect to [http://localhost:2023/trpc-playground](http://localhost:2023/trpc-playground) to have some tRPC fun.

Look at [trpc-playground](https://github.com/sachinraja/trpc-playground) on usage.

