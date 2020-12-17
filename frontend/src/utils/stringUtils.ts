export const formatQuantityWithUnit = (
	quantity: number,
	singlularForm: string,
	pluralForm: string
) => {
	return quantity + " " + (quantity > 1 ? pluralForm : singlularForm);
};
