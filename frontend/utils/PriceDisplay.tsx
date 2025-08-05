import React from 'react';

interface PriceProps {
  amount: number;
}

const PriceDisplay: React.FC<PriceProps> = ({ amount }) => {

  if (typeof amount !== 'number') return <span>₹0</span>;
  const formatted = amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  });

  return formatted;
};

export default PriceDisplay;


