import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import App from './components/app/App';
import { StrictMode } from 'react';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
