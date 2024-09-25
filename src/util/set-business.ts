export const setBusiness = (name: string, id: string) => {
  const business = JSON.stringify({ name: name, id: id });
  sessionStorage.setItem('business', business);
};
