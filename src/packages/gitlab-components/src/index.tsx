import { PluginDescriptor } from '@craftercms/studio-ui';
import CreateMergeRequest from './components/CreateMergeRequest'

const plugin: PluginDescriptor = {
  locales: undefined,
  scripts: undefined,
  stylesheets: undefined,
  id: 'org.rd.plugin.gitlab',
  widgets: {
    'org.rd.plugin.gitlab.CreateMergeRequest': CreateMergeRequest  
  }
};

export { CreateMergeRequest };

export default plugin;