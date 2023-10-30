import plugins.org.rd.plugin.gitlab.GitLab

def gitlab = new GitLab(pluginConfig)

return gitlab.listMergeRequests(params.projectId)