export const validateName = (name) => {
  if (!name.trim()) return 'errorNameRequired';
  if (name.length <= 2) return 'errorNameShort';
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return 'errorEmailRequired';
  if (!emailRegex.test(email)) return 'errorEmailInvalid';
  return null;
};
