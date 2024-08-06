export { dropdownToggle };

const dropdownToggle = (container) => {
  const containerDisplay = container.style.display;

  if (containerDisplay === 'flex') {
    container.style.display = 'none';
  } else {
    container.style.display = 'flex';
  }
};
