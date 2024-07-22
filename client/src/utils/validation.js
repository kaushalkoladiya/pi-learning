const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
const zipCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
const priceRegex = /^\d+(\.\d{1,2})?$/;
const titleRegex = /^[a-zA-Z\s]+$/;
const fileNameRegex = /^[a-zA-Z0-9_]+(\.[a-zA-Z]{2,4})$/;
const assignmentFileRegex = /^[a-zA-Z0-9]+_Assignment+(\.[a-zA-Z]{2,4})$/

export const validateEmail = (email) => emailRegex.test(email);
export const validateName = (name) => nameRegex.test(name);
export const validatePassword = (password) => passwordRegex.test(password);
export const validateDate = (date) => dateRegex.test(date);
export const validatePhoneNumber = (phoneNumber) =>
  phoneRegex.test(phoneNumber);
export const validateZipCode = (zipCode) => zipCodeRegex.test(zipCode);
export const validatePrice = (price) =>
  priceRegex.test(price) && parseFloat(price) > 0;
export const validateTitle = (title) => titleRegex.test(title);
export const validateFileName = (fileName) => fileNameRegex.test(fileName);
export const validateAssigmentFileName = (assignmentName) => assignmentFileRegex.test(assignmentName);

export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "firstName":
    case "firstName":
      if (!value) {
        return "First name is required";
        return "First name is required";
      } else if (!validateName(value)) {
        return "First name contains only letters";
        return "First name contains only letters";
      }
      break;
    case "lastName":
    case "lastName":
      if (!value) {
        return "Last name is required";
        return "Last name is required";
      } else if (!validateName(value)) {
        return "Last name contains only letters";
        return "Last name contains only letters";
      }
      break;
    case "gender":
    case "gender":
      if (!value) {
        return "Gender is required";
        return "Gender is required";
      }
      break;
    case "email":
    case "email":
      if (!value) {
        return "Email is required";
        return "Email is required";
      } else if (!validateEmail(value)) {
        return "Fill correct email format (something@gmail.com)";
        return "Fill correct email format (something@gmail.com)";
      }
      break;
    case "password":
    case "password":
      if (!value) {
        return "Password is required";
        return "Password is required";
      } else if (!validatePassword(value)) {
        return "Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character";
      }
      break;
    case "confirmPassword":
      if (!value) {
        return "Password confirmation is required";
      }
      break;
    case "dateOfBirth":
      console.log(value);
      if (value && !validateDate(value)) {
        return "Date must be in dd-mm-yyyy format";
      }
      break;
    case "phoneNumber":
      if (value && !validatePhoneNumber(value) && value !== "Not Provided") {
        return "Phone number must be in 123-456-7890 format";
      }
      break;
    case "departmentCode":
      if (!value) {
        return "Department is required";
      }
      break;
    case "zipCode":
      if (!value) {
        return "Zip code is required";
      } else if (!validateZipCode(value)) {
        return "Zip code must be in A1A 1A1 format";
      }
      break;
    case "city":
      if (!value) {
        return "City is required";
      } else if (!validateName(value)) {
        return "City contains only letters";
      }
      break;
    case "provinceCode":
      if (!value) {
        return "Province is required";
      }
      break;
    case "address":
      if (!value) {
        return "Address is required";
      }
      break;
    case "shortDescription":
      if (!value) {
        return "Short description is required";
      }
      break;
    case "longDescription":
      if (!value) {
        return "Long description is required";
      }
      break;
    case "programTitle":
      if (!value) {
        return "Program title is required";
      } else if (!validateTitle(value)) {
        return "Program title contains only letters";
      }
      break;
    case "price":
      if (!value) {
        return "Price is required";
      } else if (!validatePrice(value)) {
        return "Price must be greater than zero and not more than 2 decimal points((e.g., 10.52)";
      }
      break;
    case "durationInMonths":
      if (!value) {
        return "Duration is required";
      } else if (value <= 0) {
        return "Duration must be greater than zero.";
      }
      break;
    case "courseTitle":
      if (!value) {
        return "Course title is required";
      } else if (!validateTitle(value)) {
        return "Course title contains only letters and spaces";
      }
      break;
    case "instructorId":
      if (!value) {
        return "Instructor ID is required";
      }
      break;
    case "lessonId":
      if (!value) {
        return "Lesson ID is required";
      } else if (!validateProgramId(value)) {
        return "Lesson ID must contain 4 letters first and 4 digits last (e.g., LESS1234)";
      }
      break;
    case "lessonName":
      if (!value) {
        return "Lesson name is required";
      } else if (!validateTitle(value)) {
        return "Lesson name contains only letters and spaces";
      }
      break;
    case "lessonDescription":
      if (!value) {
        return "Lesson description is required";
      }
      break;
      case "fileId":
      if (!value) {
        return "File ID is required";
      } else if (!validateProgramId(value)) {
        return "File ID must contain 4 letters first and 4 digits last (e.g., FILE1234)";
      }
      break;
      case "fileName":
      if (!value) {
        return "File name is required";
      } else if (!validateFileName(value)) {
        return "File name invalid Format (Use FileName.jpeg or File_Name.docx)";
      }
      break;
      case "assignmentId":
      if (!value) {
        return "Assignment ID is required";
      } else if (!validateProgramId(value)) {
        return "Assignment ID must contain 4 letters first and 4 digits last (e.g., ASST1234)";
      }
      break;
      case "assignmentName":
      if (!value) {
        return "Assignment name is required";
      } else if (!validateAssigmentFileName(value)) {
        return "File name invalid Format (Use FileName_Assignment.docx)";
      }
      break;
      case "dueDate":
      case "dueDate":
      if (!value) {
        return "Due Date is required";
        return "Due Date is required";
      }
      break;
    default:
      return "";
      return "";
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
