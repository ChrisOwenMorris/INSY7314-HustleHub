/**
 * File: utils/taxCalculator.js
 * Description: Calculates progressive estimated tax liability based on gross freelancer income.
 * Uses simplified tax bracket rules for freelance income reporting.
 */

const calculateEstimatedTax = (grossIncome) => {
    if (!grossIncome || grossIncome <= 0) {
        return { grossIncome: 0, taxableIncome: 0, estimatedTax: 0, effectiveTaxRate: "0%" };
    }

    let tax = 0;
    if (grossIncome <= 95000) {
        tax = grossIncome * 0.18; 
    } else if (grossIncome <= 230000) {
        tax = 17100 + (grossIncome - 95000) * 0.26; 
    } else {
        tax = 52200 + (grossIncome - 230000) * 0.31; 
    }

    const effectiveRate = ((tax / grossIncome) * 100).toFixed(1) + "%";

    return {
        grossIncome: Number(grossIncome.toFixed(2)),
        estimatedTax: Number(tax.toFixed(2)),
        netIncome: Number((grossIncome - tax).toFixed(2)),
        effectiveTaxRate: effectiveRate
    };
};

module.exports = { calculateEstimatedTax };