export const sizeType = {
  LG: 'large',
  MD: 'medium',
  SM: 'small'
};

export function setSize(blockName, size) {
  if (size === sizeType.LG) {
    return `${blockName}--size-${sizeType.LG}`;
  } else if (size === sizeType.SM) {
    return `${blockName}--size-${sizeType.SM}`;
  }
  return `${blockName}--size-${sizeType.MD}`;
}

export function setStripe(blockName, stripe) {
  if (stripe) {
    return `${blockName}--stripe-true`;
  }
  return "";
}

export function setHeaderRow(blockName, isHeader) {
  if (isHeader) {
    return `${blockName}--isHeader-true`;
  }
  return `${blockName}--isHeader-false`;
}