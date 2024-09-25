export const getBusiness = () => {
  const business = sessionStorage.getItem('business');
  const parsedBusiness = business ? JSON.parse(business) : null;
  if (parsedBusiness) {
    return {
      name: parsedBusiness.name,
      id: parsedBusiness.id,
    };
  }
  return { name: null, id: null };
};
