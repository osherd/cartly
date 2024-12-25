import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = 'http://localhost:5000'; //process.env.BASE_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/auth/users/`;

// Validate email
export const validateEmail = (email: string): boolean => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ) !== null;
};

// Register User
interface UserData {
  name: string;
  email: string;
  password: string;
}

interface ApiResponse {
  data: unknown;
  statusText: string;
}

export const signup = async (userData: UserData): Promise<unknown> => {
  try {
    const response: ApiResponse = await axios.post(API_URL + "signup", userData);

    if (response.statusText === "OK") {
      toast.success("User Registered successfully");
    }

    return response.data;

  } catch (error: unknown) {
    const err = error as AxiosError;
    const message =
      (err.response && (err.response.data as { message: string }).message) ||
      err.message ||
      err.toString();
    toast.error(message as string);
  }
};

// Login User
interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  data: unknown;
  statusText: string;
}

export const login = async (userData: LoginData): Promise<unknown> => {
  try {
    const response: LoginResponse = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError;
    const message =
      (err.response && err.response.data && (err.response.data as { message: string }).message) ||
      err.message ||
      err.toString();
    toast.error(message as string);
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await axios.get(API_URL + "logout");
  } catch (error) {
    const err = error as AxiosError;
    const message =
      (err.response && err.response.data && (err.response.data as { message: string }).message) ||
      err.message ||
      err.toString();
    toast.error(message as string);
  }
};



// Get Login Status
export const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");
  return response.data;
};

// Get user profile
export const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

// Update profile
interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  // Add other fields as necessary
}

interface UpdateUserResponse {
  data: unknown;
}

export const updateUser = async (userData: UpdateUserData): Promise<unknown> => {
  const response: UpdateUserResponse = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

// Send Verification Email
export const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendVerificationEmail");
  return response.data.message;
};

// Verify User
interface VerifyUserResponse {
  data: {
    message: string;
  };
}

export const verifyUser = async (verificationToken: string): Promise<string> => {
  const response: VerifyUserResponse = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );

  return response.data.message;
};

// Change Password
interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  data: {
    message: string;
  };
}

export const changePassword = async (userData: ChangePasswordData): Promise<string> => {
  const response: ChangePasswordResponse = await axios.patch(API_URL + "changePassword", userData);

  return response.data.message;
};

// Reset Password
export const resetPassword = async (userData: UserData, resetToken: string) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );

  return response.data.message;
};

// fORGOT Password
export const forgotPassword = async (userData: UserData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);

  return response.data.message;
};

// Get Users
export const getUsers = async () => {
  const response = await axios.get(API_URL + "getUsers");

  return response.data;
};
// Delete User
export const deleteUser = async (id: string) => {
  const response = await axios.delete(API_URL + id);

  return response.data.message;
};

// Upgrade User
export const upgradeUser = async (userData: UserData) => {
  const response = await axios.post(API_URL + "upgradeUser", userData);

  return response.data.message;
};

// Send Login Code
export const sendLoginCode = async (email: string) => {
  const response = await axios.post(API_URL + `sendLoginCode/${email}`);

  return response.data.message;
};
// Login With Code
export const loginWithCode = async (code: string, email: string) => {
  const response = await axios.post(API_URL + `loginWithCode/${email}`, code);

  return response.data;
};
// Login With Googlr
export const loginWithGoogle = async (userToken: string) => {
  const response = await axios.post(API_URL + "google/callback", userToken);

  return response.data;
};



