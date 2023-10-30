import plugins.org.rd.plugin.gitlab.GitLab

def gitlab = new GitLab(pluginConfig)

return gitlab.mergeMergeRequest(params.projectId, params.mergeRequestIId)
