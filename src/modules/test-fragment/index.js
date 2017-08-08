import 'components/styles/index.scss';
import './style';
import {ReduxBoot} from 'next-react-redux';
import App from './app';

// https://www.npmjs.com/package/react-addons-create-fragment


ReduxBoot.run(App,'app');
