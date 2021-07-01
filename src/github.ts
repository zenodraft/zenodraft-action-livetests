import * as core from '@actions/core'
import * as github from '@actions/github'
import { WorkflowDispatchEvent, ReleaseEvent } from '@octokit/webhooks-definitions/schema'


export const show_github_payload = (): void => {
    if (github.context.eventName === 'workflow_dispatch') {
        const payload = github.context.payload as WorkflowDispatchEvent
        core.info(JSON.stringify(payload, null, 4))
    } else if (github.context.eventName === 'release') {
        const payload = github.context.payload as ReleaseEvent
        core.info(JSON.stringify(payload, null, 4))
    } else {
        core.info(`unsupported event: ${github.context.eventName}`)
    }
}