package plugins.org.rd.plugin.gitlab

@Grab(group='io.github.http-builder-ng', module='http-builder-ng-core', version='1.0.4', initClass=false)

import org.slf4j.Logger
import org.slf4j.LoggerFactory

import groovy.json.JsonSlurper
import groovyx.net.http.HttpBuilder

import static groovyx.net.http.HttpBuilder.configure

/**
 * API service wrapper for Gitlab
 */
public class GitLab {

    private static final Logger logger = LoggerFactory.getLogger(GitLab.class);

    def pluginConfig
    def token
    def baseUrl

   /**
     * constructor
     */
    GitLab(pluginConfig) {
        this.pluginConfig = pluginConfig
        this.token = pluginConfig.getString("apiKey")
        this.baseUrl = pluginConfig.getString("baseUrl") ? pluginConfig.getString("baseUrl") : "https://gitlab.com"
    }

    /**
     * list merge requests
     */
    def listMergeRequests(project) {
        def result = getRequest("/api/v4/projects/${project}/merge_requests")
        return result
    }

    /**
     * create a merge request
     */
    def createMergeRequest(project, title, sourceBranch, targetBranch) {
        def result = postRequest("/api/v4/projects/${project}/merge_requests", [
         "title": title,
         "source_branch":sourceBranch,
         "target_branch": targetBranch
        ])

        return result
    }

    /**
     * Approve merge requests
     */
    def approveMergeRequest(project, id) {
        def result = postRequest("/api/v4/projects/${project}/merge_requests/${id}/approve", [])
        return result
    }

    /**
     * Merge merge request     */
    def mergeMergeRequest(project, id) {
        //PUT /projects/:id/merge_requests/:merge_request_iid/merge
        def result = putRequest("/api/v4/projects/${project}/merge_requests/${id}/merge")
        return result
    }

    /**
     * create and approve a merge request
     */
    def createAndApproveMergeRequest(project, title, sourceBranch, targetBranch) {
        def createResult = createMergeRequest(project, title, sourceBranch, targetBranch)
        System.out.println("Created Merge Request: ${createResult.iid}")
        def approveResult = approveMergeRequest(project, createResult.iid)
        System.out.println("Approved Merge Request: ${createResult.iid} :${approveResult}")

        def continueTrying = true
        def tryCount = 0

        def result 
        while(continueTrying) {
            try {
                sleep(1000 * 3)
                result = mergeMergeRequest(project, createResult.iid)
                System.out.println("Merged request (on attempt ${tryCount}) ${createResult.iid}.")
                continueTrying = false
            }
            catch(mergeFailure) {
                tryCount++
                if(tryCount > 5) {
                    System.out.println("Failed to merge request ${createResult.iid}. Giving up")
                    continueTrying = false
                    throw new Exception("Failed to merge request ${createResult.iid}. Giving up")
                }
            }

        }

        return result
    }

    /**
     * Reject merge requests
     */
    def rejectMergeRequest() {
    }

    /**`
     * Make a PUT request
     * @param url - the API URL
     */
    def putRequest(url) {
        System.out.println("x")
        def apiUrl = createGitlabApiUrl(url)
        def result = HttpBuilder.configure {
            request.raw = apiUrl
        }.put()

        return result
    }

    /**
     * Make a POST request
     * @param url - the API URL
     */
    def postRequest(url, payload) {
        def apiUrl = createGitlabApiUrl(url)
        def result = HttpBuilder.configure {
            request.raw = apiUrl
            request.contentType = "application/json"
            request.body = payload
        }.post()

        return result
    }

    /**
     * Make a DELETE request
     * @param url - the API URL
     */
    def deleteRequest(url) {
        def apiUrl = createGitlabApiUrl(url)
        def result = apiUrl.delete()
        return result
    }

    /**
     * Make a get request
     * @param url - the API URL
     */
    def getRequest(url) {
        def apiUrl = createGitlabApiUrl(url)
        def result = HttpBuilder.configure { request.raw = apiUrl }.get()
        return result
    }

    def createGitlabApiUrl(url) {
        def qs = (url.indexOf("?")== -1) ? "?" : "&"
        def apiUrl = "${this.baseUrl}${url}${qs}private_token=${this.token}"
        System.out.println("created URL ${apiUrl}")
        return apiUrl
    }

    /**Returns
     * Manually doing this to avoid sandbox issues
     */
    def urlEncode(value){

        def encodedValue = value
            .replace("%", "%25")
            .replace(" ", "%20")
            .replace("&", "%26")
            .replace("?", "%3F")
            .replace("=", "%3D")

        return encodedValue
    }
}
