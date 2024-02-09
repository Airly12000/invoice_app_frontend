const months = {
	'01': 'January',
	'02': 'February',
	'03': 'March',
	'04': 'April',
	'05': 'May',
	'06': 'June',
	'07': 'July',
	'08': 'August',
	'09': 'September',
	10: 'October',
	11: 'November',
	12: 'December',
};

const todayGlobal = new Date();
const todayGlobal2 = new Date();

export const getDate = (param) => {
	let today = new Date();

	if (param) {
		today = new Date(param);
	}

	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();
	// let hh = today.getHours();
	let mn = today.getMinutes();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;
	if (mn < 10) mn = '0' + mn;

	let formattedToday = dd + '-' + months[mm] + ' ' + yyyy;

	if (param) {
		formattedToday = dd + ' ' + months[mm] + ' ' + yyyy;
	}

	return formattedToday;
};

export const formatDate = (param) => {
	let todayF = new Date(param);

	const yyyy = todayF.getFullYear();
	let mm = todayF.getMonth() + 1; // Months start at 0!
	let dd = todayF.getDate();
	// let hh = todayF.getHours();
	let mn = todayF.getMinutes();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;
	if (mn < 10) mn = '0' + mn;

	let formattedTodayF = yyyy + '-' + mm + '-' + dd;

	return formattedTodayF;
};

export const statusButton = (status) => {
	if (status === 'pending') {
		return 'pendingButton';
	} else if (status === 'paid') {
		return 'paidButton';
	} else {
		return 'draftButton';
	}
};

export const capitalize = (status) => {
	let firstLetter = status.charAt(0);
	firstLetter = firstLetter.toUpperCase();
	let rest = status.slice(1);
	let capitalizedWord = firstLetter + rest;
	return capitalizedWord;
};

export const validateEmail = (email) => {
	if (email) {
		if (email.includes('@') && email.includes('.')) {
			return true;
		}
	}
	return false;
};

export const validateItems = (items) => {
	if (items.length !== 0) {
		return true;
	}
	return false;
};

export const validateItemName = (item) => {
	if (!item.name) {
		return false;
	}
	return true;
};

export const validateInvoice = (invoice) => {
	try {
		if (
			invoice.description &&
			invoice.clientName &&
			invoice.senderAddress.street &&
			invoice.senderAddress.city &&
			invoice.senderAddress.postCode &&
			invoice.senderAddress.country &&
			invoice.clientAddress.street &&
			invoice.clientAddress.city &&
			invoice.clientAddress.postCode &&
			invoice.clientAddress.country &&
			invoice.clientEmail
		) {
			if (validateEmail(invoice.clientEmail)) {
				return true;
			} else {
				return false;
			}
		}
	} catch (error) {
		console.log('error', error);
		return false;
	}
};

const addDays = (date, days) => {
	date.setDate(date.getDate() + days);
	return date;
};

const standardDate = (date) => {
	const n = new Date(date);
	return n;
};

export const createID = () => {
	let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let id = '';
	for (var i = 0; i < 2; i++) {
		var randomNumber = Math.floor(Math.random() * chars.length);
		id += chars.substring(randomNumber, randomNumber + 1);
	}
	const random = Math.floor(Math.random() * (10000 - 1000)) + 1000;
	id = id + random;

	return id;
};

export const createInvoiceObject = (invoice) => {
	let finalInvoice;
	if (!invoice.createdAt || !invoice.paymentTerms) {
		if (!invoice.createdAt && !invoice.paymentTerms) {
			const paymentDue = addDays(todayGlobal, 30);
			finalInvoice = {
				...invoice,
				senderAddress: invoice.senderAddress,
				clientAddress: invoice.clientAddress,
				items: invoice.items,
				createdAt: formatDate(todayGlobal2),
				paymentDue: formatDate(paymentDue),
				paymentTerms: 30,
			};
		} else if (!invoice.createdAt) {
			const paymentDue = addDays(todayGlobal, invoice.paymentTerms);
			finalInvoice = {
				...invoice,
				senderAddress: invoice.senderAddress,
				clientAddress: invoice.clientAddress,
				items: invoice.items,
				createdAt: formatDate(todayGlobal2),
				paymentDue: formatDate(paymentDue),
			};
		} else if (!invoice.paymentTerms) {
			const paymentDue = addDays(standardDate(invoice.date), 30);
			finalInvoice = {
				...invoice,
				senderAddress: invoice.senderAddress,
				clientAddress: invoice.clientAddress,
				items: invoice.items,
				paymentTerms: 30,
				paymentDue: formatDate(paymentDue),
			};
		}
	} else {
		const paymentDue = addDays(
			standardDate(invoice.date),
			invoice.paymentTerms
		);
		finalInvoice = {
			...invoice,
			senderAddress: invoice.senderAddress,
			clientAddress: invoice.clientAddress,
			items: invoice.items,
			paymentDue: formatDate(paymentDue),
		};
	}

	delete finalInvoice['date'];

	return finalInvoice;
};

export const filterLength = (invoices, filterArg) => {
	return invoices.filter((invoice) => invoice.status.includes(filterArg))
		.length;
};
