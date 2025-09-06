import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import { Text } from 'src/ui/text';
import { clsx } from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
export const ArticleParamsForm = () => {
	const options: OptionType[] = [];
	const [state] = useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [classNameContainer, setclassNameContainer] = useState<string>(
		styles.container
	);
	function onClickOpen() {
		setIsOpen((open) => {
			open = !open;
			if (open) {
				setclassNameContainer(clsx(styles.container, styles.container_open));
			} else {
				setclassNameContainer(clsx(styles.container));
			}
			return open;
		});
	}

	/*
	Мы нажимаем на кнопке мыши левую кнопку, срабатывает обработчик события onclick, который в свою очеред вызывает нашу функцию onClickOpen 
	в котором мы вызываем функцию setIsOpen т.к. вызывается функция setIsOpen в котором параметр функция то эта функция добавляется в очередь
	после мы проверяем текущее значение isopen меняем классы и выходим из функции, после выхода из обработчика react перересовывает компонент и видимт что в очереди есть функции для изменения значения 
	и вызывает их меняя значения на новые
	*/
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClickOpen} />
			<aside className={classNameContainer}>
				<form className={styles.form}>
					<Text as='h1' size={45} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						name='radio'
						options={options}
						selected={state.fontSizeOption}
						title='Размер Шрифта'
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
