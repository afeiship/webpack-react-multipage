import 'components/styles/index.scss';
import './style';

import App from './app';
import {ReduxBoot} from 'next-react-redux';

ReduxBoot.run(App,'app');
