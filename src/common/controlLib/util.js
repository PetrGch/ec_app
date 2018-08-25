export const sizeType = {
  LG: 'large',
  MD: 'medium',
  SM: 'small'
};

export function setSize(blockName, size) {
  if (size === sizeType.LG) {
    return `${blockName}--size-${sizeType.LG}`
  } else if (size === sizeType.SM) {
    return `${blockName}--size-${sizeType.SM}`
  }
  return `${blockName}--size-${sizeType.MD}`
}