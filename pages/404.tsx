import Head from 'next/head';


function Error404() {
	return (
		<>
			<Head>
				<title>Аква термикс</title>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel='icon' type='image/svg' sizes="32x32" href="/img/logo.svg" />
			</Head>
			<h1>Ошибка 404</h1>
		</>
	);
}

export default Error404;

