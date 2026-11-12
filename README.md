# Hashmedo for n8n

Connect a saved n8n workflow to Hashmedo and choose who receives human questions. The Hashmedo node reads the current workflow ID and gives you a link to complete setup in your browser. Hashmedo uses your n8n sign-in to find the shared project and its members. Setup needs no Hashmedo password or API key.

## Connect a workflow

1. Install the Hashmedo node in n8n, then add it after a Manual Trigger in a saved workflow inside a shared project.
2. Enter the **Hashmedo Connect URL** supplied by the operator of your Hashmedo connection service. The bundled example uses the local pilot at `http://127.0.0.1:17659/connect`.
3. Run the workflow and open `connectUrl` from the node output. In n8n, sign in as a project admin and allow `workflow:read` and `user:list`.
4. In Hashmedo, choose the recipients and select **Connect and send test question**. Hashmedo creates a workspace on the first connection for the project.
5. Open the recipient inbox link in the selected recipient's browser and sign in with that person's n8n account. The inbox shows **Did this test question reach you?**

The node builds the URL without making a network request. It includes the current workflow ID and does not send input items or credentials to Hashmedo. Hashmedo looks up the workflow and roster after OAuth consent. The pilot delivers the test question to the Hashmedo inbox.

## Cloud Starter pilot

Use a shared project on an n8n instance with the public API and OAuth enabled. A project admin can connect the workflow and select recipients. A selected recipient needs access to the workflow to sign in to the pilot inbox.

For the local pilot, open the node's output link in a browser on the computer running Hashmedo. Even when the node runs in n8n Cloud, the browser opens the link and completes the callback. A shared reviewer environment needs a reachable Hashmedo connection service or access to a computer running the pilot.

Import [the example workflow](examples/connect-hashmedo.json) directly into the shared project. Save it before running it. Its workflow ID comes from the instance running the node.

## Run the Hashmedo pilot locally

In the Hashmedo platform checkout, apply the database migrations to a disposable PostgreSQL database and start the connection service with the `hashmedo_app` role and the trusted n8n instance origin.

```sh
HASHMEDO_N8N_ISSUER=https://your-instance.app.n8n.cloud \
HASHMEDO_N8N_DB_URL='postgres://hashmedo_app:hashmedo_app@127.0.0.1:17660/postgres?sslmode=disable' \
go run ./cmd/n8n-connect
```

The service listens on `127.0.0.1:17659`. The OAuth flow binds the connecting user and recipients to the n8n instance, project and user ID.

## Build the node

```sh
npm ci
npm run lint
npm run build
npm pack --dry-run
```

For a local n8n instance, install the packed tarball as a private node or use `npm run dev`. n8n Cloud installation is available after [community verification](https://docs.n8n.io/connect/create-nodes/deploy-your-node/submit-community-nodes/).
