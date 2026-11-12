# Submit Hashmedo for n8n community verification

The package is `n8n-nodes-hashmedo`. Copy this directory to the root of a dedicated, public GitHub repository owned by Hashmedo. The package contains the node, license, example and instructions. The Hashmedo platform checkout contains the connection backend and should stay separate.

1. Confirm the npm publisher account and the public GitHub repository. The release workflow adds the actual repository URL to the npm manifest before publishing so the source and provenance match.
2. Configure `publish.yml` as the package's npm Trusted Publisher. For a first release where npm has no package settings yet, use the first-publish procedure npm supports for your account. The workflow accepts a granular `NPM_TOKEN` secret if needed. After the first release, configure trusted publishing and remove the temporary token. Run the workflow manually on the repository's default branch. Leave **Publish the verified package to npm** off to check the build, then enable it for the release.
3. Check that the npm version page shows provenance and the correct public source repository. Run `npx @n8n/scan-community-package n8n-nodes-hashmedo@0.1.0` against the published release. Submit the package in the [n8n Creator Portal](https://creators.n8n.io/nodes).
4. Give the reviewer the [example workflow](examples/connect-hashmedo.json) and access to the Hashmedo connection pilot. Describe the current operation as connecting a workflow and sending a test question from setup.
5. After n8n verifies the package, enable verified community nodes on Cloud Starter and install Hashmedo from the nodes panel. Import the example into the test project, run it there, and confirm that the node output contains the ID of that Cloud workflow. Select the QA recipient, verify that Hashmedo creates or reuses the workspace, then sign in as the recipient and confirm that the new question appears in their inbox.

See [n8n's verification guidelines](https://docs.n8n.io/connect/create-nodes/build-your-node/reference/verification-guidelines/) and [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/).
