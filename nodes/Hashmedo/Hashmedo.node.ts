import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class Hashmedo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hashmedo',
		name: 'hashmedo',
		icon: { light: 'file:hashmedo.svg', dark: 'file:hashmedo.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: 'Connect Workflow',
		usableAsTool: true,
		description: 'Connect a saved workflow to Hashmedo and choose who receives questions',
		defaults: { name: 'Hashmedo' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		properties: [
			{
				displayName: 'Hashmedo Connect URL',
				name: 'connectUrl',
				type: 'string',
				required: true,
				noDataExpression: true,
				default: '',
				placeholder: 'https://your-hashmedo-host.example/connect',
				description: 'The connection endpoint of your Hashmedo service',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const { id } = this.getWorkflow();
		if (!id) {
			throw new NodeOperationError(this.getNode(), 'Save the workflow before connecting Hashmedo.');
		}

		let connect: URL;
		try {
			connect = new URL(String(this.getNodeParameter('connectUrl', 0)).trim());
		} catch {
			throw new NodeOperationError(this.getNode(), 'Enter a valid Hashmedo Connect URL.');
		}
		const localPilot = connect.origin === 'http://127.0.0.1:17659';
		if (
			(connect.protocol !== 'https:' && !localPilot) ||
			connect.username ||
			connect.password ||
			connect.search ||
			connect.hash ||
			!connect.pathname.endsWith('/connect')
		) {
			throw new NodeOperationError(
				this.getNode(),
				'Use an HTTPS Hashmedo URL ending in /connect, or the local pilot URL.',
			);
		}

		connect.searchParams.set('workflow', id);
		return [[{ json: { workflowId: id, connectUrl: connect.toString() }, pairedItem: 0 }]];
	}
}
