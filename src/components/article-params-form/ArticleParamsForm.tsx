import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useCallback, useRef, useState } from 'react';
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
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
type ArticleParamsFormProps = {
	onStateChange: (newState: ArticleStateType) => void;
	state: ArticleStateType;
};
export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	//поясни
	const classNameContainer = clsx(styles.container, {
		[styles.container_open]: isMenuOpen,
	});
	function onClickOpen() {
		setIsMenuOpen((prev) => !prev);
	}
	function close() {
		setIsMenuOpen(false);
	}
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: close,
	});
	// Универсальная фабрика обработчиков изменения поля состояния
	const [formState, setFormState] = useState(props.state);
	const createChangeHandler = useCallback(
		<K extends keyof ArticleStateType>(key: K) =>
			(selectedOption: ArticleStateType[K]) => {
				setFormState((prev) => ({
					...prev,
					[key]: selectedOption,
				}));
			},
		[]
	);
	function onClickReset() {
		setFormState(defaultArticleState);
		props.onStateChange(defaultArticleState);
	}
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		props.onStateChange(formState);
	};
	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={onClickOpen} />
			<aside className={classNameContainer} ref={rootRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={45} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={createChangeHandler('fontFamilyOption')}
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер Шрифта'
						onChange={createChangeHandler('fontSizeOption')}
						name='radio'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={createChangeHandler('fontColor')}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={createChangeHandler('backgroundColor')}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={createChangeHandler('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onClickReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
