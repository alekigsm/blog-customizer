import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
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
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onStateChange: (newState: ArticleStateType) => void;
	state: ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const state = props.state;
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
	function close() {
		setIsOpen((open) => {
			open = false;
			setclassNameContainer(clsx(styles.container));
			return open;
		});
	}
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: close,
	});

	const [stateFont, setStateFont] = useState(state.fontFamilyOption);

	function onChangeFontFamily(selected: OptionType): void {
		setStateFont(selected);
	}
	const [stateFontColor, setStateFontColor] = useState(state.fontColor);
	function onChangeFontColor(selected: OptionType): void {
		setStateFontColor(selected);
	}
	const [stateBackGroundColor, setStateBackGroundColor] = useState(
		state.backgroundColor
	);
	function onChangeBackGroundColor(selected: OptionType): void {
		setStateBackGroundColor(selected);
	}
	const [stateContentWidth, setStateContentWidth] = useState(
		state.contentWidth
	);
	function onChangeContentWidth(selected: OptionType): void {
		setStateContentWidth(selected);
	}
	const [stateFontSize, setStateFontSize] = useState(state.fontSizeOption);
	function onChangeFontSize(selected: OptionType): void {
		setStateFontSize(selected);
	}

	function onCliCkReset() {
		setStateFont(defaultArticleState.fontFamilyOption);
		setStateFontColor(defaultArticleState.fontColor);
		setStateBackGroundColor(defaultArticleState.backgroundColor);
		setStateContentWidth(defaultArticleState.contentWidth);
		setStateFontSize(defaultArticleState.fontSizeOption);
		props.onStateChange(defaultArticleState);
	}
	function onClickApply() {
		props.onStateChange({
			fontFamilyOption: stateFont,
			fontColor: stateFontColor,
			backgroundColor: stateBackGroundColor,
			contentWidth: stateContentWidth,
			fontSizeOption: stateFontSize,
		});
		//onClickOpen();
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
			<aside className={classNameContainer} ref={rootRef}>
				<form className={styles.form}>
					<Text as='h1' size={45} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={stateFont}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={onChangeFontFamily}
					/>
					<RadioGroup
						selected={stateFontSize}
						options={fontSizeOptions}
						title='Размер Шрифта'
						onChange={onChangeFontSize}
						name='radio'
					/>
					<Select
						selected={stateFontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={onChangeFontColor}
					/>
					<Select
						selected={stateBackGroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={onChangeBackGroundColor}
					/>
					<Select
						selected={stateContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={onChangeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onCliCkReset}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={onClickApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
