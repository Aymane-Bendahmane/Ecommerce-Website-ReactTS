export function formatCurrency(amount: number, currency: string = 'USD'): string {
    // Format the amount as a currency string
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    });
    return formatter.format(amount);
}