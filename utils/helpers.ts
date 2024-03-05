export const minifyAddress = (address: string) => {
    // console.log(address)
    if (!address || address === '') return ''
    return address?.substring(0, 6) +
        '...' +
        address.slice(-4)
}

export function calculatePercentile(rarity: number, totalCount: number = 2000): string {
    // Calculate the raw percentile
    let percentile = (rarity / totalCount) * 100;

    // Calculate the 10% bracket
    let bracket = Math.ceil(percentile / 10) * 10;

    return 'Top ' + bracket + '%';
}