const BASE_URL = "http://localhost:5215/api";

interface SignInResponse {
  token: string;
}

export const api = {
  auth: {
    signup: async (data: {
      username: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      dateOfBirth: string;
      gender: string;
    }) => {
      const response = await fetch(`${BASE_URL}/Auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      return response.json();
    },

    signin: async (data: {
      username: string;
      password: string;
      email: string;
    }): Promise<SignInResponse> => {
      const response = await fetch(`${BASE_URL}/Auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    },
  },
};
