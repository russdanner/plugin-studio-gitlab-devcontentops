const React = craftercms.libs.React;
const { Tooltip, Backdrop, CircularProgress, Alert } = craftercms.libs.MaterialUI;
const IconButton = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const Button = craftercms.libs.MaterialUI.Button && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Button, 'default') ? craftercms.libs.MaterialUI.Button['default'] : craftercms.libs.MaterialUI.Button;
const { useSelector } = craftercms.libs.ReactRedux;
const ChecklistRtlRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ChecklistRtlRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ChecklistRtlRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ChecklistRtlRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ChecklistRtlRounded');
const Snackbar = craftercms.libs.MaterialUI.Snackbar && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Snackbar, 'default') ? craftercms.libs.MaterialUI.Snackbar['default'] : craftercms.libs.MaterialUI.Snackbar;
const { post } = craftercms.utils.ajax;
const { pull, push } = craftercms.services.repositories;
const DownloadRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/DownloadRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DownloadRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DownloadRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DownloadRounded');
const PublishRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/PublishRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/PublishRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/PublishRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/PublishRounded');

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useActiveSiteId() {
  return useSelector((state) => state.sites.active);
}

function CreateMergeRequest(props) {
    var useIcon = props.useIcon, projectId = props.projectId, sourceBranch = props.sourceBranch, targetBranch = props.targetBranch, mrTitle = props.mrTitle; props.createMergeRequestLabel; var createAndApproveMergeRequestLabel = props.createAndApproveMergeRequestLabel; props.approveMergeRequestLabel; props.rejectMergeRequestLabel; props.listMergeRequestsLabel;
    var siteId = useActiveSiteId();
    var _a = React.useState(''), snackMessage = _a[0], setSnackMessage = _a[1];
    var _b = React.useState(true), snackSuccess = _b[0], setSnackSuccess = _b[1];
    var _c = React.useState(false), snackShow = _c[0], setSnackShow = _c[1];
    var _d = React.useState(false), progressShow = _d[0], setProgressShow = _d[1];
    var PLUGIN_SERVICE_BASE = '/studio/api/2/plugin/script/plugins/org/rd/plugin/gitlab/gitlab/devcontentops';
    var handleCreateAndApproveMergeClick = function (event) {
        setProgressShow(true);
        var serviceUrl = "".concat(PLUGIN_SERVICE_BASE, "/create-and-approve-merge-request.json?siteId=").concat(siteId, "&projectId=").concat(projectId, "&title=").concat(mrTitle, "&sourceBranch=").concat(sourceBranch, "&targetBranch=").concat(targetBranch);
        post(serviceUrl).subscribe({
            next: function (response) {
                // sort our our attachments vs everything else
                response.response.result;
                setSnackMessage("".concat(createAndApproveMergeRequestLabel ? createAndApproveMergeRequestLabel : 'Pull', " completed successfully."));
                setSnackSuccess(true);
                setSnackShow(true);
            },
            error: function (response) {
                setSnackMessage("".concat(createAndApproveMergeRequestLabel ? createAndApproveMergeRequestLabel : 'Pull', " failed."));
                setSnackSuccess(false);
                setSnackShow(true);
            }
        });
    };
    function handleSnackClose(event, reason) {
        setProgressShow(false);
        setSnackShow(false);
    }
    return (React.createElement(React.Fragment, null,
        useIcon ? (React.createElement(Tooltip, { title: createAndApproveMergeRequestLabel ? createAndApproveMergeRequestLabel : "Create and Approve Merge Request" },
            React.createElement(IconButton, { size: "small", onClick: handleCreateAndApproveMergeClick },
                React.createElement(ChecklistRtlRoundedIcon, null)))) : (React.createElement(Button, { size: "small", variant: "text", onClick: handleCreateAndApproveMergeClick }, createAndApproveMergeRequestLabel ? createAndApproveMergeRequestLabel : "Create and Approve Merge Request")),
        React.createElement(Backdrop, { sx: { color: '#fff', zIndex: function (theme) { return theme.zIndex.drawer + 1; } }, open: progressShow },
            React.createElement(CircularProgress, { color: "inherit" }),
            React.createElement(Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'center' }, open: snackShow, autoHideDuration: 5000, onClose: handleSnackClose },
                React.createElement(Alert, { severity: snackSuccess ? "success" : "error", sx: { width: '100%' } }, snackMessage)))));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useEnv() {
  return useSelector((state) => state.env);
}

function MergeRequestWorkflow(props) {
    var useIcon = props.useIcon, remoteName = props.remoteName, mergeStrategy = props.mergeStrategy, pullBranch = props.pullBranch, pushBranch = props.pushBranch, pullLabel = props.pullLabel, pushLabel = props.pushLabel, _a = props.enablePull, enablePull = _a === void 0 ? true : _a, _b = props.enablePush, enablePush = _b === void 0 ? true : _b;
    var siteId = useActiveSiteId();
    useEnv();
    var _c = React.useState(''), snackMessage = _c[0], setSnackMessage = _c[1];
    var _d = React.useState(true), snackSuccess = _d[0], setSnackSuccess = _d[1];
    var _e = React.useState(false), snackShow = _e[0], setSnackShow = _e[1];
    var _f = React.useState(false), progressShow = _f[0], setProgressShow = _f[1];
    var onPullSuccess = function (result) {
        setSnackMessage("".concat(pullLabel ? pullLabel : 'Pull', " completed successfully."));
        setSnackSuccess(true);
        setSnackShow(true);
    };
    var onPullError = function (result) {
        setSnackMessage("".concat(pullLabel ? pullLabel : 'Pull', " failed."));
        setSnackSuccess(false);
        setSnackShow(true);
    };
    var onPushSuccess = function () {
        setSnackMessage("".concat(pushLabel ? pushLabel : 'Push', " completed successfully."));
        setSnackSuccess(true);
        setSnackShow(true);
    };
    var onPushError = function (result) {
        setSnackMessage("".concat(pushLabel ? pushLabel : 'Push', " failed."));
        setSnackSuccess(false);
        setSnackShow(true);
    };
    var handlePullClick = function (event) {
        setProgressShow(true);
        pull({
            siteId: siteId,
            remoteName: remoteName,
            remoteBranch: pullBranch,
            mergeStrategy: mergeStrategy
        }).subscribe({
            next: function (result) {
                onPullSuccess();
            },
            error: function (_a) {
                var response = _a.response;
                onPullError(response.response);
            }
        });
    };
    var handlePushClick = function (event) {
        setProgressShow(true);
        push(siteId, remoteName, pushBranch, false).subscribe({
            next: function () {
                onPushSuccess();
            },
            error: function (_a) {
                var response = _a.response;
                onPushError(response.response);
            }
        });
    };
    function handleSnackClose(event, reason) {
        setProgressShow(false);
        setSnackShow(false);
    }
    return (React.createElement(React.Fragment, null,
        useIcon ? (React.createElement(React.Fragment, null,
            enablePull ? (React.createElement(Tooltip, { title: pullLabel ? pullLabel : "Pull" },
                React.createElement(IconButton, { size: "small", onClick: handlePullClick },
                    React.createElement(DownloadRoundedIcon, null)))) : (React.createElement(React.Fragment, null)),
            enablePush ? (React.createElement(Tooltip, { title: pushLabel ? pushLabel : "Push" },
                React.createElement(IconButton, { size: "small", onClick: handlePushClick },
                    React.createElement(PublishRoundedIcon, null)))) : (React.createElement(React.Fragment, null)))) : (React.createElement(React.Fragment, null,
            enablePull ? (React.createElement(Button, { size: "small", variant: "text", onClick: handlePullClick }, pullLabel ? pullLabel : "Pull")) : (React.createElement(React.Fragment, null)),
            enablePush ? (React.createElement(Button, { size: "small", variant: "text", onClick: handlePushClick }, pushLabel ? pushLabel : "Push")) : (React.createElement(React.Fragment, null)))),
        React.createElement(Backdrop, { sx: { color: '#fff', zIndex: function (theme) { return theme.zIndex.drawer + 1; } }, open: progressShow },
            React.createElement(CircularProgress, { color: "inherit" }),
            React.createElement(Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'center' }, open: snackShow, autoHideDuration: 5000, onClose: handleSnackClose },
                React.createElement(Alert, { severity: snackSuccess ? "success" : "error", sx: { width: '100%' } }, snackMessage)))));
}

var plugin = {
    locales: undefined,
    scripts: undefined,
    stylesheets: undefined,
    id: 'org.rd.plugin.gitlab',
    widgets: {
        'org.rd.plugin.gitlab.CreateMergeRequest': CreateMergeRequest,
        'org.rd.plugin.gitlab.MergeRequestWorkflow': MergeRequestWorkflow,
    }
};

export { CreateMergeRequest, MergeRequestWorkflow, plugin as default };
