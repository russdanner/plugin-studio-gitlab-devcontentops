import plugins.org.rd.plugin.gitlab.GitLab

def gitlab = new GitLab(pluginConfig)

return gitlab.createAndApproveMergeRequest(params.projectId, params.title, params.sourceBranch, params.targetBranch)