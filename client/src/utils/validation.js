export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};


export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'firstName':
      if (!value) {
        return 'First name is required';
      } else if (!validateName(value)) {
        return 'First name contains only letters';
      }
      break;
    case 'lastName':
      if (!value) {
        return 'Last name is required';
      } else if (!validateName(value)) {
        return 'Last name contains only letters';
      }
      break;
    case 'gender':
      if (!value) {
        return 'Gender is required';
      }
      break;
    case 'email':
      if (!value) {
        return 'Email is required';
      } else if (!validateEmail(value)) {
        return 'Fill correct email format (something@gmail.com)';
      }
      break;
    case 'password':
      if (!value) {
        return 'Password is required';
      } else if (!validatePassword(value)) {
        return 'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character';
      }
      break;
    case 'confirmPassword':
      if (!value) {
        return 'Password confirmation is required';
      }
      break;
    default:
      return '';
  }
};

export const validateForm = (form) => {
  const errors = {};
  for (const [fieldName, value] of Object.entries(form)) {
    const error = validateField(fieldName, value);
    if (error) {
      errors[fieldName] = error;
    }
  }
  return errors;
};
