import { useRef } from 'react';
import { SignUpForm } from '@/components/modules/AuthPage/SignUpForm';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from '@/styles/auth/index.module.scss';
import cn from 'classnames';
import { SignInForm } from '@/components/modules/AuthPage/SignInForm';
import { ModeToggler } from '@/components/elements/ModeToggler/ModeToggler';
import { useUnit } from 'effector-react';
import { $mode } from '@/context/mode';


const AuthPage = (): JSX.Element => {

	const isMedia800 = useMediaQuery(800); // Если будет меньше 800 то нам будет приходить false
	const switchCtn = useRef<HTMLDivElement>(null);
	const switchC1 = useRef<HTMLDivElement>(null);
	const switchC2 = useRef<HTMLDivElement>(null);
	const switchCircle1 = useRef<HTMLDivElement>(null);
	const switchCircle2 = useRef<HTMLDivElement>(null);
	const switchBtn = useRef<HTMLDivElement>(null);
	const aContainer = useRef<HTMLDivElement>(null);
	const bContainer = useRef<HTMLDivElement>(null);

	const mode = useUnit($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

	const swithForm = () => {

		switchCtn.current?.classList.add(styles.is_gx);
		setTimeout(() => {
			switchCtn.current?.classList.remove(styles.is_gx);
		}, 1500)

		switchCtn.current?.classList.toggle(styles.is_txr);
		switchCircle1.current?.classList.toggle(styles.is_txr);
		switchCircle2.current?.classList.toggle(styles.is_txr);

		switchC1.current?.classList.toggle(styles.is_hidden);
		switchC2.current?.classList.toggle(styles.is_hidden);
		aContainer.current?.classList.toggle(styles.is_txl);
		bContainer.current?.classList.toggle(styles.is_txl);
		bContainer.current?.classList.toggle(styles.is_z200);
	}
	return (
		<div className={cn(styles.main, darkModeClass)}>
			<div className={styles.mode_toggle}>
				<ModeToggler />
			</div>
			<div className={cn(styles.container, styles.a_container, darkModeClass)} id="a-container" ref={aContainer}>
				<div className={styles.container__inner}>
					<SignUpForm swithForm={swithForm} />
				</div>
			</div>
			<div className={cn(styles.container, styles.b_container, darkModeClass)} id="b-container" ref={bContainer}>
				<div className={styles.container__inner}>
					<SignInForm />
				</div>
			</div>
			<div className={cn(styles.switch, darkModeClass)} id="switch-cnt" ref={switchCtn}>
				<div className={cn(styles.switch__circle, darkModeClass)} ref={switchCircle1}></div>
				<div className={cn(styles.switch__circle, styles.switch__circle__t, darkModeClass)} ref={switchCircle2}></div>
				<div className={styles.switch__container} id="switch-c1" ref={switchC1}>
					{!isMedia800 && (<>
						<h2 className={cn(styles.switch__title, styles.title, darkModeClass)}>Добро пожаловать!</h2>
						<p className={cn(styles.switch__description, styles.description, darkModeClass)}>Чтобы оставаться на связи с нами, пожалуйста, войдите под своей личной информацией</p>
					</>)
					}
					<button className={cn(styles.switch__button, styles.button, styles.switch_btn, darkModeClass)} onClick={swithForm}>Войти</button>

				</div>
				<div className={cn(styles.switch__container, styles.is_hidden)} id="switch-c2" ref={switchC2}>
					{!isMedia800 && (<>
						<h2 className={cn(styles.switch__title, styles.title, darkModeClass)}>Привет друг!</h2>
						<p className={cn(styles.switch__description, styles.description, darkModeClass)}>Ввведите свои личные данные и начните путешествие с нами</p>
					</>)
					}
					<button className={cn(styles.switch__button, styles.button, styles.switch_btn, darkModeClass)} onClick={swithForm}>Зарегистрироваться</button>
				</div>
			</div >
		</div >
	);
}

export default AuthPage