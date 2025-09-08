//./styles/index.module.scss
import styles from 'src/styles/index.module.scss';
import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
const App = () => {
	const [articleSettings, setarticleSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const handleStateChange = (newState: ArticleStateType) => {
		setarticleSettings(newState);
	};
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onStateChange={handleStateChange}
				state={articleSettings}
			/>
			<Article />
		</main>
	);
};

export default App;
